import angular from 'angular';
import Helper from './event-detail.helper';

export default class {

  constructor($q, $state, Auth, EventService) {
    'ngInject';

    angular.extend(this, {
      $state,
      Auth,
      EventService,
      helper: new Helper($q, Auth, EventService),
      event: null,
      errorMessages: [],
      isNew: !$state.params.id,
      isReadonly: true,
    });
  }

  $onInit() {
    this.helper.getEvent(this.$state.params.id).then(event => {
      this.event = event;
      if (this.isNew) {
        this.event.host = this.Auth.getCurrentUserSync();
      }
      this.isReadonly = !this.helper.isAdminOrHost(this.event) && !this.isNew;
      this.loaded = true;
    });
  }

  onSaveOrUpdate($event) {
    if (!this.isNew) {
      this.EventService.update($event).then(() => {
        this.$state.go('event.event-list');
      }, err => {
        this.errorMessages.push(err);
      });
    } else {
      this.EventService.save($event).then(() => {
        this.$state.go('event.event-list');
      }, err => {
        this.errorMessages.push(err);
      });
    }
  }

  onDelete($event) {
    this.EventService.delete($event).then(() => {
      this.$state.go('event.event-list', { reload: true });
    }, err => {
      this.errorMessages.push(err);
    });
  }
}
