import angular from 'angular';

export default class {

  constructor(EventService) {
    'ngInject';

    angular.extend(this, {
      EventService
    });
  }

  getEvents(searchText) {
    if (searchText) {
      return this.EventService.search(searchText);
    } else {
      return this.EventService.getAll();
    }
  }
}
