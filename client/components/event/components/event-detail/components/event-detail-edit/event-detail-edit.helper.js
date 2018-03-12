import moment from 'moment/moment';
import angular from 'angular';

export default class {

  constructor(uiGmapIsReady, MapViewService) {
    'ngInject';

    angular.extend(this, {
      uiGmapIsReady,
      MapViewService
    });
  }

  onDateTimeChange(selectedDate, selectedTime) {
    let momentDateTime = moment();
    momentDateTime.set('year', selectedDate.getFullYear());
    momentDateTime.set('month', selectedDate.getMonth());
    momentDateTime.set('date', selectedDate.getDate());
    momentDateTime.set('hour', selectedTime.getHours());
    momentDateTime.set('minute', selectedTime.getMinutes());
    return momentDateTime.toDate();
  }

  refreshMap(where, map) {
    if (where.location.latitude && where.location.longitude) {
      const isDefaultLocation = this.MapViewService.isDefaultLocation(where.location);
      map.zoom = this.MapViewService.getMapZoom({ zoomIn: !isDefaultLocation });
      map.center = where.location;

      // Only add marker to non-default location
      this.uiGmapIsReady.promise()
        .then(() => {
          map.markers = [];
          if (!isDefaultLocation) {
            map.markers.push({ idKey: 1, coords: {latitude: map.center.latitude, longitude: map.center.longitude}});
          }
        });
    }
  }
}
