import angular from 'angular';

const BASE_URL = '/api/events';
const SEARCH = 'search';
const HOSTING = 'hosting';
const GOING = 'going';
const FAVORITE = 'favorite';

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
    return this.ApiService.put(`${BASE_URL}/${event._id}`, event);
  }

  delete(id) {
    return this.ApiService.del(`${BASE_URL}/${id}`);
  }

  search(text) {
    return this.ApiService.get(`${BASE_URL}/${text}/${SEARCH}`);
  }

  getHostingEventsByHost(host) {
    return this.ApiService.get(`${BASE_URL}/${host._id}/${HOSTING}`);
  }

  getGoingEventsByParticipant(participant) {
    return this.ApiService.get(`${BASE_URL}/${participant._id}/${GOING}`);
  }

  getFavoriteEventsByUser(user) {
    return this.ApiService.get(`${BASE_URL}/${user._id}/${FAVORITE}`);
  }
}
