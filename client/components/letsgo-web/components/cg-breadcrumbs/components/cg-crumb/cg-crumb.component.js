import template from './cg-crumb.html';
import controller from './cg-crumb.controller';

export default {
  template,
  controller,
  require: {
    crumb: '^cgBreadcrumbs'
  },
  bindings: {
    title: '@',
    target: '@?'
  }
};
