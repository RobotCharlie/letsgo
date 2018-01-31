import EventDetail from './event-detail/event-detail.module';
import EventList from './event-list/event-list.module';

const module = angular.module('letsgo.components.event.components', [
  EventDetail,
  EventList
]);

export default module.name;
