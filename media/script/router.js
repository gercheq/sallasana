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
            console.log("INIT:  ApplicationRouter...");

            this.$container = $('#page-app').find('.ui-content');

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
            // this.activeView.render();
        },

        // launch method
        launch: function() {
            console.log("Routing to Launch");

            // Launch Photo Stack Automatically
            this.photoStackView = new PhotoStackView();
            this.$container.html( this.photoStackView.render().el );


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
