import angular from 'angular';

const BASE_URL = '/api/things';

export default class {

  constructor(ApiService) {
    'ngInject';

    angular.extend(this, {
      ApiService
    });
  }

  getEvents() {
    return this.ApiService.get(`${BASE_URL}`);
  }

  getEvent(id) {
    return this.ApiService.get(`${BASE_URL}/${id}`);
  }
}
