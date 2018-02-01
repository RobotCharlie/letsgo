import angular from 'angular';

export default class {

  constructor($q, Auth, EventService) {
    'ngInject';

    angular.extend(this, {
      $q,
      Auth,
      EventService
    });
  }

  getEvent(id) {
    if (id) {
      return this.EventService.get(id);
    } else {
      return this.$q.when({});
    }
  }

  isAdminOrHost(event) {
    return this.Auth.isAdminSync() || (event.host && this.Auth.getCurrentUserSync()._id === event.host._id);
  }
}
