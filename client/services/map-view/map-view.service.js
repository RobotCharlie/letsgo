import angular from 'angular';

const TORONTO_LOCATION = Object.freeze({
  latitude: 43.653226,
  longitude: -79.38318429999998
});

const ZOOM = Object.freeze({
  in: 15,
  out: 8
})

export default class {

  constructor() {
    'ngInject';
  }

  /**
   * Option: {
   *   zoomIn: {boolean}
   * }
   * @returns {{center: Readonly<{latitude: number, longitude: number}>, zoom: number, markers: Array, control: {}}}
   */
  getMapParams(option) {
    return {
      center: angular.copy(TORONTO_LOCATION),
      zoom: option.zoomIn ? ZOOM.in : ZOOM.out,
      markers: [],
      control: {}
    };
  }

  /**
   * Option: {
   *   zoomIn: {boolean}
   * }
   * @param option
   * @returns {number}
   */
  getMapZoom(option) {
    return option.zoomIn ? ZOOM.in : ZOOM.out;
  }

  /**
   * Get default location
   * @returns {*}
   */
  getDefaultLocation() {
    return angular.copy(TORONTO_LOCATION);
  }

  /**
   * Check is location is default location.
   * @param location
   * @returns {boolean}
   */
  isDefaultLocation(location) {
    return location.latitude === TORONTO_LOCATION.latitude && location.longitude === TORONTO_LOCATION.longitude;
  }
}
