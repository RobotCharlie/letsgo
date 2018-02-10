import angular from 'angular';
import moment from 'moment/moment';

export default class {

  constructor($state, Auth, EventService) {
    'ngInject';

    angular.extend(this, {
      $state,
      EventService,
      searchText: null,
      events: [],
      currentUserId: Auth.getCurrentUserSync()._id,
      loaded: false
    });
  }

  $onInit() {
    this.searchText = this.$state.params.searchText;
    if (this.searchText) {
      this.EventService.search(this.searchText).then(res => {
        this.events = res;
        this.loaded = true;
      });
    } else {
      this.EventService.getAll().then(res => {
        this.events = res;
        this.loaded = true;
      });
    }
  }
}
