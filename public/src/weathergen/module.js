
var app = angular.module('cst.weathergen', ['MessageCenterModule']);

app.config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('weathergen', {
        url: '/weathergen',
        templateUrl: 'weathergen/templates/weathergen.html',
        controller: 'WeatherCtrl',
        controllerAs: 'wgen'
      })
      .state('weathergen.data', {
        url: '/data',
        templateUrl: 'weathergen/templates/data.html',
        controller: 'DataCtrl',
        controllerAs: 'data'
      })
      .state('weathergen.data.map', {
        url: '/map',
        templateUrl: 'weathergen/templates/data-map.html',
        controller: 'DataMapCtrl',
        controllerAs: 'map'
      })
      .state('weathergen.data.file', {
        url: '/file',
        templateUrl: 'weathergen/templates/data-file.html'
      })
      .state('weathergen.data.view', {
        url: '/view',
        templateUrl: 'weathergen/templates/data-view.html',
        controller: 'DataViewCtrl'
      })
      .state('weathergen.sim', {
        url: '/sim',
        templateUrl: 'weathergen/templates/sim.html',
        controller: 'SimCtrl',
        controllerAs: 'sim'
      })
      .state('weathergen.sim.run', {
        url: '/run',
        templateUrl: 'weathergen/templates/sim-run.html',
        controller: 'SimRunCtrl',
        controllerAs: 'setupRun'
      })
      .state('weathergen.sim.batch', {
        url: '/batch',
        templateUrl: 'weathergen/templates/sim-batch.html',
        controller: 'SimBatchCtrl',
        controllerAs: 'setupBatch'
      })
      .state('weathergen.sim.jobs', {
        url: '/jobs',
        templateUrl: 'weathergen/templates/sim-jobs.html',
        controller: 'SimJobsCtrl'
      })
      .state('weathergen.sim.job', {
        url: '/jobs/:id',
        templateUrl: 'weathergen/templates/sim-job.html',
        controller: 'SimJobCtrl',
        controllerAs: 'job',
        resolve: {
          job: function($stateParams, $state, messageCenterService, jobService) {
            console.log('resolve job');
            return jobService.getJob($stateParams.id)
              .success(function(data) { return data; })
              .error(function(data) {
                messageCenterService.add('danger', 'Error getting job: ' + data, {
                  status: messageCenterService.status.next,
                  timeout: 3000
                });
                $state.go('weathergen.sim.jobs');
              });
          }
        },
        onExit: function(jobService) {
          jobService.stopPoll();
        }
      })
      .state('weathergen.sim.job.run', {
        url: '/run',
        templateUrl: 'weathergen/templates/sim-results-run.html',
        controller: 'SimResultsRunCtrl'
      })
      .state('weathergen.sim.job.batch', {
        url: '/batch',
        templateUrl: 'weathergen/templates/sim-results-batch.html',
        controller: 'SimResultsBatchCtrl'
      });
  }]);