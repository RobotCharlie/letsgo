import angular from 'angular';

export default class {

  constructor(EventService) {
    'ngInject';

    angular.extend(this, {
      EventService,
      events: []
    });
  }

  onChange($event) {
    if ($event) {
      this.EventService.search($event)
        .then(res => {
          this.events = res;
        });
    } else {
      this.events = [];
    }
  }

  onSearch() {

  }
}
