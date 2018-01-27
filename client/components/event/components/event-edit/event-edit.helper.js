import angular from 'angular';

export default class {

  constructor($q, EventService) {
    'ngInject';

    angular.extend(this, {
      $q,
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
}
