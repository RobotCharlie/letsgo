import angular from 'angular';

export default class {

  constructor(EventService) {
    'ngInject';

    angular.extend(this, {
      EventService,
      events: []
    });
  }

  $onInit() {
    this.EventService.getEvents().then(res => {
      this.events = res;
    });
  }
}
