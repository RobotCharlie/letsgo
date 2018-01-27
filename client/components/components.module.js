import Event from './event/event.module';
import LetsgoWeb from './letsgo-web/components.module';

const module = angular.module('letsgo.components', [
  Event,
  LetsgoWeb
]);

export default module.name;
