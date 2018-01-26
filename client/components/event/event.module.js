import eventComponent from './event.component';

const module = angular.module('letsgo.components.event', []);

module.component('event', eventComponent);

// configure component states
module.config($stateProvider => {
  'ngInject';

  $stateProvider
    .state('event', {
      url: '/events',
      template: '<event></event>'
    });
});

export default module.name;
