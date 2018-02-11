import myEventsComponent from './my-events.component';

const module = angular.module('letsgo.components.event.components.my-events', []);

module.component('myEvents', myEventsComponent);

// configure component states
module.config($stateProvider => {
  'ngInject';

  $stateProvider
    .state('event.my-events', {
      url: '/my-events',
      template: '<my-events></my-events>'
    });
});

export default module.name;
