import eventListComponent from './event-list.component';

const module = angular.module('letsgo.components.event.components.event-list', []);

module.component('eventList', eventListComponent);

// configure component states
module.config($stateProvider => {
  'ngInject';

  $stateProvider
    .state('event.event-list', {
      url: '/event-list',
      template: '<event-list></event-list>'
    });
});

export default module.name;
