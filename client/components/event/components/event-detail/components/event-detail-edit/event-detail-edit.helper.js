import moment from 'moment/moment';
import angular from 'angular';

export default class {

  constructor(uiGmapIsReady) {
    'ngInject';

    angular.extend(this, {
      uiGmapIsReady
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

  getMapParams() {
    return { center: { latitude: 43.6, longitude: -79.3 }, zoom: 8, markers: [], control: {} };
  }

  refreshMap(where, map) {
    if (where.location.latitude && where.location.longitude) {
      map.center = where.location;
      map.zoom = 15;
    } else {
      map = this.getMapParams();
    }
    this.uiGmapIsReady.promise()
      .then(() => {
        map.markers.push({ idKey: 1, coords: {latitude: map.center.latitude, longitude: map.center.longitude}});
      });
  }
}
