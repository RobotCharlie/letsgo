import angular from 'angular';

export default class {

  constructor($uibModalInstance, eventId) {
    'ngInject';

    angular.extend(this, {
      $uibModalInstance,
      eventId
    });
  }

  close() {
    this.$uibModalInstance.close();
  }
}
