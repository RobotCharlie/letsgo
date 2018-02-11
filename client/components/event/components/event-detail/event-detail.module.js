import eventDetailComponent from './event-detail.component';
import EventDetailComponents from './components/components.module';

const module = angular.module('letsgo.components.event.components.event-detail', [
  EventDetailComponents
]);

module.component('eventDetail', eventDetailComponent);

// configure component states
module.config($stateProvider => {
  'ngInject';

  $stateProvider
    .state('event.event-detail', {
      url: '/event-detail/:id',
      params: {
        searchText: null
      },
      template: '<event-detail></event-detail>'
    });
});

export default module.name;
