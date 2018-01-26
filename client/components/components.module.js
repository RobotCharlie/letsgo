import angular from 'angular';
import Event from './event/event.module';

const module = angular.module('letsgoApp.components', [
  Event
]);

export default module.name;
