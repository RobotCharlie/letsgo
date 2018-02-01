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
      loaded: false
    });
  }

  $onInit() {
    this.helper.getEvent(this.$state.params.id).then(event => {
      this.event = event;
      if (this.isNew) {
        this.event.host = this.Auth.getCurrentUserSync();
        this.pushHostToBeAParticipant(this.event);
      }
      this.isReadonly = !this.helper.isAdminOrHost(this.event) && !this.isNew;
      this.loaded = true;
    });
  }

  pushHostToBeAParticipant(event) {
    if (!event.participant) {
      event.participants = [];
    }
    event.participants.push({ note: '', user: event.host });
  }

  saveOrUpdate($event) {
    if (!this.isNew) {
      return this.EventService.update($event);
    } else {
      return this.EventService.save($event);
    }
  }

  delete($event) {
    return this.EventService.delete($event);
  }
}
