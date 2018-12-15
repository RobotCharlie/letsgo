import angular from 'angular';
import _ from 'lodash';

export default class {

  constructor(Auth, uiGmapIsReady, MapViewService) {
    'ngInject';

    angular.extend(this, {
      Auth,
      uiGmapIsReady,
      MapViewService
    });
  }

  getMyNote(event) {
    const meAsParticipant = this.getMeAsParticipant(event);
    if (meAsParticipant) {
      return meAsParticipant.note;
    } else {
      return '';
    }
  }

  getMeAsParticipant(event) {
    return _.find(event.participants, participant => {
      return participant.user._id === this.Auth.getCurrentUserSync()._id;
    });
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
