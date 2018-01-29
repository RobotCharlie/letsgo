import angular from 'angular';

export default class {

  constructor(Auth, EventService) {
    'ngInject';

    angular.extend(this, {
      EventService,
      events: [],
      currentUserId: Auth.getCurrentUserSync()._id
    });
  }

  $onInit() {
    this.EventService.getAll().then(res => {
      this.events = res;
    });
  }
}
