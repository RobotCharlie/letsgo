import template from './event-detail-edit.html';
import controller from './event-detail-edit.controller';

export default {
  template,
  controller,
  bindings: {
    event: '<',
    onSaveOrUpdate: '&',
    onDelete: '&'
  }
};
