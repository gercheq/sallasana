// Sets the require.js configuration for your application.
require.config( {

      // 3rd party script alias names
      paths: {
            // Core Libraries
            "jquery": "../third_party/jquery-1.9.1.min",
            "snap": "../third_party/snap",
            "underscore": "../third_party/lodash",
            "backbone": "../third_party/backbone",
            "router": "router"
      },

      // Sets the configuration for your third party scripts that are not AMD compatible
      shim: {
            "backbone": {
                  "deps": [ "underscore", "jquery" ],
                  "exports": "Backbone"  //attaches "Backbone" to the window object
            }
      }

});

// Includes File Dependencies
require([ "jquery", "backbone", "router", "snap"  ], function( $, Backbone, ApplicationRouter, Snap) {

    console.log("INIT REQUIRE & BACKBONE");

    // This doesn't belong here
    // Initialize in the router
    var snapper = new Snap({
        element: document.getElementById('content')
    });


    // Instantiates a new Backbone.js Mobile Router
    SA = window.SA || {};
    SA.router = new ApplicationRouter();

});
