(function() {
  'use strict';

  angular
    .module('<%= prefix %>.<%= module %>.views.<%= classedName %>', [
      'ui.router',
      '<%= prefix %>.core.utils.Logger'
    ])
    .config(StateConfig)
    .controller('<%= prefix %><%= classedName %>Controller', <%= classedName %>Controller);

  function StateConfig($stateProvider) {
    $stateProvider
      .state('admin.<%= module %><%= classedName %>', {
        url:           '/<%= url %>',
        session:       true,
        navigationKey: '<%= module %>',
        views:         {
          'content': {
            templateUrl:  util.templateUrl('<%= prefix %>.<%= module %>.views.<%= classedName %>'),
            controller:   '<%= prefix %><%= classedName %>Controller',
            controllerAs: '<%= prefix %><%= classedName %>'
          }
        }
      });
  }

  function <%= classedName %>Controller(Logger) {
    var log = new Logger('<%= prefix %>.<%= module %>.views.<%= classedName %>');
    var vm = this;

    // code goes here...

  }

}());
