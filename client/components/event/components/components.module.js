import EventEdit from './event-edit/event-edit.module';
import EventList from './event-list/event-list.module';

const module = angular.module('letsgo.components.event.components', [
  EventEdit,
  EventList
]);

export default module.name;
