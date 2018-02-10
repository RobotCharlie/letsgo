import cgBreadcrumbs from './cg-breadcrumbs/cg-breadcrumbs.module';
import cgSimpleProfile from './cg-simple-profile/cg-simple-profile.module';
import cgSearchBar from './cg-search-bar/cg-search-bar.module';

const module = angular.module('letsgo.components.letsgo-web.components', [
  cgBreadcrumbs,
  cgSimpleProfile,
  cgSearchBar
]);

export default module.name;
