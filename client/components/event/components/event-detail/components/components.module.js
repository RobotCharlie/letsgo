import EventDetailDisplay from './event-detail-display/event-detail-display.module';
import EventDetailEdit from './event-detail-edit/event-detail-edit.module';

const module = angular.module('letsgo.components.event.components.event-detail.components', [
  EventDetailDisplay,
  EventDetailEdit
]);

export default module.name;
