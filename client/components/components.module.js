import Event from './event/event.module';
import LetsgoWeb from './letsgo-web/letsgo-web.module';
import SearchBar from './search-bar/search-bar.module';

const module = angular.module('letsgo.components', [
  Event,
  LetsgoWeb,
  SearchBar
]);

export default module.name;
