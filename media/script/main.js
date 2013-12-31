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
            "bootstrap-switch": "../third_party/bootstrap-switch/bootstrap-switch",
            "hammer": "../third_party/hammer",
            "jquery.hammer": "../third_party/jquery.hammer",
            "backbone.hammer": "../third_party/backbone.hammer",
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
            },

            "jquery.hammer": {
                "deps": ["jquery", "hammer"],
                "exports": "Hammer"
            },

            "backbone.hammer": {
                "deps": ["jquery", "backbone", "hammer", "jquery.hammer"]
            }
      }

});

// Includes File Dependencies
require([ "jquery", "backbone", "router", "snap", "backbone.hammer",  "jquery.bootstrap"  ], function( $, Backbone, ApplicationRouter, Snap, Hammer) {

    console.log("INIT REQUIRE & BACKBONE");

    // TODO(gercek): This is wrong, just create another file for SA and inject it w/ requirejs
    var SA = window.SA || {};

    console.log(Hammer);


    // Instantiates a new Backbone.js Mobile Router
    SA.router = new ApplicationRouter();

});
