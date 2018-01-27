import cgBreadcrumbsComponent from './cg-breadcrumbs.component';
import CgBreadcrumbsComponents from './components/cg-breadcrumbs-components.module';

const module = angular.module('letsgo.components.letsgo-web.components.cg-breadcrumbs', [
  CgBreadcrumbsComponents
]);

module.component('cgBreadcrumbs', cgBreadcrumbsComponent);

export default module.name;
