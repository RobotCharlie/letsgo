import angular from 'angular';
import './event.scss';
import eventComponent from './event.component';

const module = angular.module('letsgoApp.components.event', []);

module.component('event', eventComponent);

// configure component states
module.config($stateProvider => {
  'ngInject';

  $stateProvider
    .state('event', {
      url: '/event',
      template: '<event></event>'
    });
});

export default module.name;
