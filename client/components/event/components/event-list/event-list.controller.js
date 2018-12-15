import angular from 'angular';
import Helper from './event-list.helper';

export default class {

  constructor($state, Auth, EventService) {
    'ngInject';

    angular.extend(this, {
      $state,
      Auth,
      EventService,
      helper: new Helper(EventService),
      searchText: null,
      events: [],
      currentUser: null,
      loaded: false
    });
  }

  $onInit() {
    this.searchText = this.$state.params.searchText;
    this.helper.getEvents(this.searchText).then(events => {
      this.events = events;
      this.currentUser = this.Auth.getCurrentUserSync();
      this.loaded = true;
    });
  }
}
