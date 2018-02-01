import angular from 'angular';
import moment from 'moment';
import _ from 'lodash';
import Helper from './event-detail-display.helper';

export default class {

  constructor($state, Auth) {
    'ngInject';

    angular.extend(this, {
      $state,
      Auth,
      helper: new Helper(Auth),
      errorMessages: [],
      displayedWhen: null,
      displayActionButtons: false,
      isCurrentUserGoing: null,
      myNote: null
    });
  }

  $onInit() {
    this.displayedWhen = moment(this.event.when).format('LLLL');
    this.displayActionButtons = this.Auth.isLoggedInSync() && this.event.host && this.Auth.getCurrentUserSync() !== this.event.host;
    this.isCurrentUserGoing =  !!this.helper.getMeAsParticipant(this.event);
    this.myNote = this.helper.getMyNote(this.event);
  }

  onGoingEvent(event) {
    event.participants.push({ note: '', user: this.Auth.getCurrentUserSync()});
    this.updateEvent(event);
  }

  onNotGoingEvent(event) {
    _.remove(event.participants, participant => {
      return participant.user._id === this.Auth.getCurrentUserSync()._id;
    });
    this.updateEvent(event);
  }

  updateEvent(event) {
    this.onUpdate({ $event: event }).then(() => {
      this.$state.reload();
    }, err => {
      this.errorMessages.push(err);
    });
  }

  updateMyNote(event) {
    const meAsParticipant = this.helper.getMeAsParticipant(event);
    meAsParticipant.note = this.myNote;
    this.updateEvent(event);
  }
}
