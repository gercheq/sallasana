// Mobile Router
// =============

// Includes file dependencies
define([
    "jquery",
    "backbone",
    "models/user",
    "collections/matches",
    "collections/recommendations",
    "views/application"
], function( $, Backbone, UserModel, MatchesCollection, RecommendationsCollection, ApplicationView) {

    // Extends Backbone.Router
    var ApplicationRouter = Backbone.Router.extend( {

        // The Router constructor
        initialize: function() {
            console.log("INIT:  ApplicationRouter...");

            var self = this;

            //
            // Setup Variables
            //

            // Main container to render pages
            self.$container = $('#application-wrapper');

            // Current view in context
            self.currentView = null;

            // Setup Collections
            self.recommendationsCollection = new RecommendationsCollection(SA.recommendations);
            RecommendationsCollection.prototype.parseInline(self.recommendationsCollection);
            // self.recommendationsCollection.fetch({ reset: true });

            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();
        },

        //
        // Routes
        // Each route specifies the current view and then calls render method on router
        //
        routes: {
            "": "launch",
            "nux": "nux",
            "login": "login",
            "logout": "logout",
            "settings": "settings",
            "_=_": "launch"
        },


        render: function(view) {
            // Destroy previous view that has been rendered
            // to release it from the memory
            if(this.currentView){
                this.currentView.destroy();
                // TODO(Gercek): Investigate if teardown method is needed
                // https://paydirtapp.com/blog/backbone-in-practice-memory-management-and-event-bindings/
            }

            // Setup the currentview to the new one and render it
            this.currentView = view;
            this.$container.html(this.currentView.render().el);
        },


        //
        // Routing Events
        //
        launch: function() {
            console.log('Routing to App!');

            var self = this,
                view = new ApplicationView({
                    'recommendationsCollection': self.recommendationsCollection
                });
            self.render(view);
        },

        nux: function(){
          console.log("Routing to NUX!")
        },

        settings: function() {
            console.log("Routing to Settings");
        },

        login: function() {
            console.log("Routing to Login");
        },

        logout: function(){
            console.log("Routing to Logout");
        }

    } );

    // Returns the Router class
    return ApplicationRouter;

} );
