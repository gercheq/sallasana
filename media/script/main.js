// Sets the require.js configuration for your application.
require.config( {

      // 3rd party script alias names
      paths: {
            // Core Libraries
            "jquery": "../third_party/jquery-1.9.1.min",
            "snap": "../third_party/snap",
            "underscore": "../third_party/lodash",
            "backbone": "../third_party/backbone",
            "jquery.bootstrap": "../third_party/bootstrap-3.0.3/js/bootstrap.min",
            "jquery.nouislider": "../third_party/jquery.nouislider/jquery.nouislider",
            "router": "router"
      },

      // Sets the configuration for your third party scripts that are not AMD compatible
      shim: {
            "backbone": {
                "deps": [ "underscore", "jquery" ],
                "exports": "Backbone"  //attaches "Backbone" to the window object
            },

            "jquery.bootstrap": {
                "deps": ["jquery"]
            }
      }

});

// Includes File Dependencies
require([ "jquery", "backbone", "router", "snap", "jquery.bootstrap"  ], function( $, Backbone, ApplicationRouter, Snap) {

    console.log("INIT REQUIRE & BACKBONE");

    // TODO(gercek): This is wrong, just create another file for SA and inject it w/ requirejs
    var SA = window.SA || {};


    // Instantiates a new Backbone.js Mobile Router
    SA.router = new ApplicationRouter();

});
