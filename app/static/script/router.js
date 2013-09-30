// Mobile Router
// =============

// Includes file dependencies
define([
    "jquery",
    "backbone",
    "models/user",
    "collections/matches",
    "collections/recommendations",
    "views/photo-stack"
], function( $, Backbone, UserModel, MatchesCollection, RecommendationsCollection, PhotoStackView) {

    // Extends Backbone.Router
    var ApplicationRouter = Backbone.Router.extend( {

        // The Router constructor
        initialize: function() {
            console.log("Initializing ApplicationRouter...");

            this.$container = $('#page-app').find('.ui-content');
//            // Instantiates a new Animal Category View
//            this.animalsView = new CategoryView( { el: "#animals", collection: new CategoriesCollection( [] , { type: "animals" } ) } );
//
//            // Instantiates a new Colors Category View
//            this.colorsView = new CategoryView( { el: "#colors", collection: new CategoriesCollection( [] , { type: "colors" } ) } );
//
//            // Instantiates a new Vehicles Category View
//            this.vehiclesView = new CategoryView( { el: "#vehicles", collection: new CategoriesCollection( [] , { type: "vehicles" } ) } );

            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();

        },

        // Backbone.js Routes
        routes: {
            // When there is no hash bang on the url, the home method is called
            "": "launch",
            "login": "login",
            "logout": "logout",
            "settings": "settings"
        },


        render: function() {
            this.activeView.render();
        },

        // launch method
        launch: function() {
            console.log("Routing to Launch");



            this.photoStackView = new PhotoStackView({
                el: this.$container
            });

            // Set the active view and render it
            this.activeView = this.photoStackView;
            this.render();

            // Programatically changes to the categories page
            // $.mobile.changePage( "#page-recommendations" , { reverse: false, changeHash: false } );
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
