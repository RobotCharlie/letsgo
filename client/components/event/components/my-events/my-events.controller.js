import angular from 'angular';
import Helper from './my-events.helper';

export default class {

  constructor($q, $state, Auth, EventService) {
    'ngInject';

    angular.extend(this, {
      $q,
      $state,
      Auth,
      EventService,
      helper: new Helper(EventService),
      myHostingEvents: [],
      myGoingEvents: [],
      currentUser: null,
      loaded: false
    });
  }

  $onInit() {
    this.Auth.getCurrentUser().then(currentUser => {
      this.currentUser = currentUser;
      this.$q.all([
        this.EventService.getHostingEventsByHost(this.currentUser),
        this.EventService.getGoingEventsByParticipant(this.currentUser)
      ]).then(res => {
        this.myHostingEvents = res[0];
        this.myGoingEvents = res[1];
        this.loaded = true;
      });
    });
  }
}
