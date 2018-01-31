import angular from 'angular';

const ROLE_ADMIN = 'admin';

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
    return this.Auth.getCurrentUserSync().role === ROLE_ADMIN || (event.host && this.Auth.getCurrentUserSync()._id === event.host._id);
  }
}
