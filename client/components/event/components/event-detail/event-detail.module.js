import eventDetailComponent from './event-detail.component';
import EventDetailComponents from './components/components.module';
import QRController from '../event-detail/templates/qr-code/qr-code.controller';

const module = angular.module('letsgo.components.event.components.event-detail', [
  EventDetailComponents
])

module.component('eventDetail', eventDetailComponent);

// For templates
module.controller('QRController', QRController);

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
