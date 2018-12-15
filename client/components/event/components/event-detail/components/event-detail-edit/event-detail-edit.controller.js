import angular from 'angular';
import moment from 'moment';
import _ from 'lodash';
import Helper from './event-detail-edit.helper';

export default class {

  constructor($state, uiGmapGoogleMapApi, uiGmapIsReady, MapViewService) {
    'ngInject';

    angular.extend(this, {
      $state,
      MapViewService,
      helper: new Helper(uiGmapIsReady, MapViewService),
      errorMessages: [],
      selectedDate: moment().toDate(),
      selectedTime: moment().toDate(),
      selectedDateTime: moment().toDate(),
      datepickerPopup: { opened: false },
      timepickerPopup: { opened: false },
      isReadonly: true,
      map: MapViewService.getMapParams({ zoomIn: false }),
      geocoder: null
    });

    uiGmapGoogleMapApi.then(mapApi => {
      this.geocoder = new mapApi.Geocoder();
    });
  }

  $onInit() {
    if(this.event._id) {
      this.parseWhen(this.event.when);
      this.map = this.MapViewService.getMapParams({ zoomIn: true });
    } else {
      // init fields for new event that will be initialized through ng-model
      this.event.where = {
        location: { latitude: null, longitude: null }
      };
    }
    this.onDateTimeChange();
    this.helper.refreshMap(this.event.where, this.map);
  }

  saveOrUpdate(event) {
    this.onSaveOrUpdate({ $event: event }).then(() => {
      this.$state.go('event.event-list');
    }, err => {
      this.errorMessages.push(err);
    });
  }

  delete(id) {
    this.onDelete({ $event: id }).then(() => {
      this.$state.go('event.event-list', { reload: true });
    }, err => {
      this.errorMessages.push(err);
    });
  }

  parseWhen(when) {
    this.selectedDateTime = moment(when).toDate();
    this.selectedDate = moment(when).toDate();
    this.selectedTime = moment(when).toDate();
  }

  openDatePopup() {
    this.datepickerPopup.opened = true;
  }

  openTimePopup() {
    this.timepickerPopup.opened = true;
  }

  onDateTimeChange() {
    this.selectedDateTime = this.helper.onDateTimeChange(this.selectedDate, this.selectedTime);
    this.event.when = this.selectedDateTime;
  }

  removeParticipant(participant) {
    _.remove(this.event.participants, participant);
  }

  geocode(address) {
    this.geocoder.geocode({ address }, (results, status) => {
      if(status == 'OK') {
        const location = results[0].geometry.location;
        this.event.where.location.latitude = location.lat();
        this.event.where.location.longitude = location.lng();
        this.helper.refreshMap(this.event.where, this.map);
      } else {
        const location = this.MapViewService.getDefaultLocation();
        this.event.where.location.latitude = location.latitude;
        this.event.where.location.longitude = location.longitude;
        this.helper.refreshMap(this.event.where, this.map);
        this.errorMessages.push('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}
