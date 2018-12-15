import ApiService from './api/api.service';
import EventService from './event/event.service';
import MapViewService from './map-view/map-view.service';

const module = angular.module('tophatApp.services', []);

module.service('ApiService', ApiService);
module.service('EventService', EventService);
module.service('MapViewService', MapViewService);

export default module.name;
