// Sets the require.js configuration for your application.
require.config( {

      // 3rd party script alias names
      paths: {

            // Core Libraries
            "jquery": "../third_party/jquery-1.9.1.min",
            "jquerymobile": "../third_party/jquery.mobile-1.4.0-beta.1/jquery.mobile-1.4.0-beta.1.min",
            "underscore": "../third_party/lodash",
            "backbone": "../third_party/backbone",
            "jquery.pep": "../third_party/jquery.pep.min",
            "router": "router"

      },

      // Sets the configuration for your third party scripts that are not AMD compatible
      shim: {

            "backbone": {
                  "deps": [ "underscore", "jquery" ],
                  "exports": "Backbone"  //attaches "Backbone" to the window object
            }

      } // end Shim Configuration

} );

// Includes File Dependencies
require([ "jquery", "backbone", "router"  ], function( $, Backbone, ApplicationRouter ) {

    console.log("REQUIRE");

	$(document).on("mobileinit",
		// Set up the "mobileinit" handler before requiring jQuery Mobile's module
		function() {
            console.log("REQUIRE2");

			// Prevents all anchor click handling including the addition of active button state and alternate link bluring.
			$.mobile.linkBindingEnabled = false;

			// Disabling this will prevent jQuery Mobile from handling hash changes
			$.mobile.hashListeningEnabled = false;
		}
	);

	require( [ "jquerymobile"  ], function() {

        console.log("Initialize jQM");

		// Instantiates a new Backbone.js Mobile Router
		this.router = new ApplicationRouter();


	});
} );
