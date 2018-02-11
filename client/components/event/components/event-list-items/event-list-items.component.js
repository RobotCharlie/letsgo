import template from './event-list-items.html';
import controller from './event-list-items.controller';

export default {
  template,
  controller,
  bindings: {
    searchText: '<',
    events: '<'
  }
};
