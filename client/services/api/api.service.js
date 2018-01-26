import angular from 'angular';

export default class {

  constructor($q, $http, Idle) {
    'ngInject';

    angular.extend(this, {
      $q,
      $http,
      Idle
    });
  }

  /**
   * Sends a request to the scheduler server.
   *
   * This function takes a single argument, a configuration object. Refer to documentation for
   * angular.$http for more details.
   *
   * @param config Configuration object for the request
   * @return {promise}
   */
  http(config) {
    if (!config.isAutoRefreshAction) {
      this.Idle.watch();
    }

    const deferred = this.$q.defer();

    this.$http(config).then(
      (success) => {
        deferred.resolve(success.data);
      },
      (failure) => {
        deferred.reject(failure.data);
      }
    );

    return deferred.promise;
  }

  /**
   * Performs a GET request.
   *
   * @param {string}  url Relative URL specifying the destination of the request
   * @param {object}  params  Query parameters to be passed with the request
   * @param {object}  config  Configuration object for the request
   * @return {promise}
   */
  get(url, params = {}, config = {}) {
    config.method = 'GET';
    config.url = url;
    config.params = params;
    return this.http(config);
  }

  /**
   * Performs a POST request.
   *
   * @param {string}  url Relative URL specifying the destination of the request
   * @param {string|object}  data  Body of the request
   * @param {object}  params  Query parameters to be passed with the request
   * @param {object}  config  Configuration object for the request
   * @return {promise}
   */
  post(url, data, params = {}, config = {}) {
    config.method = 'POST';
    config.url = url;
    config.data = data;
    config.params = params;
    return this.http(config);
  }

  /**
   * Performs a PUT request.
   *
   * @param {string}  url Relative URL specifying the destination of the request
   * @param {string|object}  data  Body of the request
   * @param {object}  params  Query parameters to be passed with the request
   * @param {object}  config  Configuration object for the request
   * @return {promise}
   */
  put(url, data, params = {}, config = {}) {
    config.method = 'PUT';
    config.url = url;
    config.data = data;
    config.params = params;
    return this.http(config);
  }

  /**
   * Performs a DELETE request.
   *
   * @param {string}  url Relative URL specifying the destination of the request
   * @param {object}  params  Query parameters to be passed with the request
   * @param {object}  config  Configuration object for the request
   * @return {promise}
   */
  del(url, params = {}, config = {}) {
    config.method = 'DELETE';
    config.url = url;
    config.params = params;
    return this.http(config);
  }

}
