// Category View
// =============

// Includes file dependencies
define([
    "jquery",
    "backbone",
    "views/recommendations",
    "views/settings",
    "views/searching"],
    function($, Backbone, RecommendationsView, SettingsView, SearchingView) {

    //
    // ApplicationView is the top-level view that controls the other subviews.
    //
    // Main responsibilities:
    //
    //  - holds the two panels and the content pane
    //  - handles events with the event aggregator
    //  - loads other subviews
    //  - handles periodic tasks
    //  - measures viewport and responds to orientation changes
    //
    var ApplicationView = Backbone.View.extend( {

        className: 'application-view',

        template: _.template($('#tmpl-application').html()),

        events: {
            'click #open-left-drawer': '_openLeftDrawer',
            'click #open-right-drawer': '_openRightDrawer',
            'click #recommendations': 'renderRecommendations',
            'click #settings': 'renderSettings',
            'click #messages': '_openRightDrawer'
        },

        initialize: function() {
            var self = this;
            console.log("INIT:  ApplicationView");


            // Initialize collections
            self.recommendationsCollection = self.options.recommendationsCollection;

            // Initialize variables
            self.$container = undefined; // Panel that holds the views

            // Initialize event aggregator
            self.eventAggregator = _.extend({}, Backbone.Events);

            // TODO(gercek): Implement NUX
            // If this is the first time using the app then


            self.eventAggregator.on('render:searching', function(){
               self.renderSearching();
            });




            if (!self.recommendationsCollection.length){
                console.log('Render searching...');
            } else {
                console.log('Render recommendations');
            }



        },

        render: function() {
            console.log("RNDR:  ApplicationView");
            var self = this;

            // render this view's template and append it to $el
            self.$el.html(self.template());
            // update shortcut for the container
            self.$container = self.$el.find('.snap-content');

            // Initialize the drawers
            SA.snapper = new Snap({
                element: self.$el.find('.snap-content')[0]
            });


            // Initialize with Searching
            self.renderRecommendations();

            return this;
        },


        renderRecommendations: function(e){
            if(e !== undefined){
                e.preventDefault();
            }
            var self = this;

            // Render searching if no more recommendations
            if(self.recommendationsCollection.isEmpty()){
                self.renderSearching();
            }

            // First hide the pane contents
            // SA.snapper.expand('left');

            // Then render recommendations view
            var view = new RecommendationsView({
                'recommendationsCollection': self.recommendationsCollection,
                'eventAggregator': self.eventAggregator
            });
            self.$container.html(view.render().$el);

            // Finally bring pane back
            SA.snapper.close();
        },


        renderSearching: function(){
            var view = new SearchingView();
            this.$container.html(view.render().$el);

            // Finally bring pane back
            SA.snapper.close();
        },


        renderSettings: function(e){
            e.preventDefault();

            // First hide the pane contents
            // SA.snapper.expand('left');

            // Then render the settings view
            var view = new SettingsView();
            this.$container.html(view.render().$el);

            // Finally bring pane back
            SA.snapper.close();

        },




        //
        // DRAWER INTERACTIONS
        //
        _openLeftDrawer: function(){
            this._openDrawer("left");
        },

        _openRightDrawer: function(){
            this._openDrawer("right");
        },

        _openDrawer: function(direction){
            // Close the drawer if it's already open otherwise open
            if(SA.snapper.state().state != direction) {
                SA.snapper.open(direction);
            } else {
                SA.snapper.close();
            }
        }

    } );

    // Returns the View class
    return ApplicationView;

});




