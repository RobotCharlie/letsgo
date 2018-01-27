import cgBreadcrumbs from './cg-breadcrumbs/cg-breadcrumbs.module';
import cgSimpleProfile from './cg-simple-profile/cg-simple-profile.module';

const module = angular.module('letsgo.components.letsgo-web.components', [
  cgBreadcrumbs,
  cgSimpleProfile
]);

export default module.name;
