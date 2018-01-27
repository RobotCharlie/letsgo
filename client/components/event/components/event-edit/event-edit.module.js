import eventEditComponent from './event-edit.component';

const module = angular.module('letsgo.components.event.components.event-edit', []);

module.component('eventEdit', eventEditComponent);

// configure component states
module.config($stateProvider => {
  'ngInject';

  $stateProvider
    .state('event.event-edit', {
      url: '/event-edit/:id',
      template: '<event-edit></event-edit>'
    });
});

export default module.name;
