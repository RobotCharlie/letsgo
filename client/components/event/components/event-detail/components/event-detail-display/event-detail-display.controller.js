import angular from 'angular';
import moment from 'moment';
import _ from 'lodash';
import Helper from './event-detail-display.helper';

export default class {

  constructor($state, uiGmapIsReady, Auth, MapViewService) {
    'ngInject';

    angular.extend(this, {
      $state,
      Auth,
      helper: new Helper(Auth, uiGmapIsReady, MapViewService),
      errorMessages: [],
      displayedWhen: null,
      displayActionButtons: false,
      isCurrentUserGoing: null,
      myNote: null,
      isFavorite: false,
      isLoggedIn: Auth.isLoggedInSync(),
      currentUser: Auth.getCurrentUserSync(),
      map: MapViewService.getMapParams({ zoomIn: false })
    });
  }

  $onInit() {
    this.displayedWhen = moment(this.event.when).format('LLLL');
    this.displayActionButtons = this.isLoggedIn && this.event.host && this.currentUser !== this.event.host;
    this.isCurrentUserGoing = !!this.helper.getMeAsParticipant(this.event);
    this.myNote = this.helper.getMyNote(this.event);
    this.isFavorite = _.includes(this.event.favoritesBy, this.currentUser._id);
    this.helper.refreshMap(this.event.where, this.map);
  }

  onGoingEvent(event) {
    event.participants.push({ note: '', user: this.currentUser});
    this.updateEvent(event);
  }

  onNotGoingEvent(event) {
    _.remove(event.participants, participant => {
      return participant.user._id === this.Auth.currentUser._id;
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

  onFavoriteChange(isFavorite, event) {
    if (isFavorite) {
      event.favoritesBy.push(this.currentUser);
    } else {
      _.pull(event.favoritesBy, this.currentUser._id);
    }
    this.updateEvent(event);
  }
}
