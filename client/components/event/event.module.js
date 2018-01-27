import eventComponent from './event.component';
import eventComponents from './components/components.module';

const module = angular.module('letsgo.components.event', [
  eventComponents
]);

module.component('event', eventComponent);

// configure component states
module.config($stateProvider => {
  'ngInject';

  $stateProvider
    .state('event', {
      abstract: true,
      template: '<event></event>'
    });
});

export default module.name;
