import ApiService from './api/api.service';
import EventService from './event/event.service';

const module = angular.module('tophatApp.services', []);

module.service('ApiService', ApiService);
module.service('EventService', EventService);

export default module.name;
