import angular from 'angular';
import _ from 'lodash';

export default class {

  constructor(Auth) {
    'ngInject';

    angular.extend(this, {
      Auth
    });
  }

  getMyNote(event) {
    const meAsParticipant = this.getMeAsParticipant(event);
    if (meAsParticipant) {
      return meAsParticipant.note;
    } else {
      return '';
    }
  }

  getMeAsParticipant(event) {
    return _.find(event.participants, participant => {
      return participant.user._id === this.Auth.getCurrentUserSync()._id;
    });
  }
}
