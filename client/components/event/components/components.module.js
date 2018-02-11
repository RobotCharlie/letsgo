import EventDetail from './event-detail/event-detail.module';
import EventList from './event-list/event-list.module';
import EventListItems from './event-list-items/event-list-items.module';
import MyEvents from './my-events/my-events.module';

const module = angular.module('letsgo.components.event.components', [
  EventDetail,
  EventList,
  EventListItems,
  MyEvents
]);

export default module.name;
