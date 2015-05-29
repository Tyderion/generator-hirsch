(function () {
  'use strict';

  angular
    .module('<%= prompts.prefix %>.layout.views.Public', [])
    .config(StateConfig);


  function StateConfig($stateProvider) {
    $stateProvider
      .state('public', {
        views: {
          'root': {
            templateUrl: 'app/layout/views/public.html'
          }
        }

      });
  }


}());
