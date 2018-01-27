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
    this.EventService.getAll().then(res => {
      this.events = res;
    });
  }
}
