import angular from 'angular';

export default class {

  constructor($state, EventService) {
    'ngInject';

    angular.extend(this, {
      $state,
      EventService,
      searchText: null,
      events: []
    });
  }

  onChange($event) {
    this.searchText = $event;
    if ($event) {
      this.EventService.search($event)
        .then(res => {
          this.events = res;
        });
    } else {
      this.events = [];
    }
  }

  onSearch($event) {
    this.$state.go('event.event-list', { searchText: $event });
  }
}
