import template from './cg-simple-profile.html';
import controller from './cg-simple-profile.controller';

export default {
  template,
  controller,
  transclude: true,
  bindings: {
    user: '<',
    showName: '<',
    size: '<'
  }
};
