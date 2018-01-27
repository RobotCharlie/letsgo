import angular from 'angular';

const BASE_URL = '/api/events';

export default class {

  constructor(ApiService) {
    'ngInject';

    angular.extend(this, {
      ApiService
    });
  }

  getAll() {
    return this.ApiService.get(`${BASE_URL}`);
  }

  get(id) {
    return this.ApiService.get(`${BASE_URL}/${id}`);
  }

  save(event) {
    return this.ApiService.post(`${BASE_URL}`, event);
  }

  update(event) {
    return this.ApiService.put(`${BASE_URL}/${event.id}`, event);
  }
}
