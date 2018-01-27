import Event from './event/event.module';
import LetsgoWeb from './letsgo-web/letsgo-web.module';

const module = angular.module('letsgo.components', [
  Event,
  LetsgoWeb
]);

export default module.name;
