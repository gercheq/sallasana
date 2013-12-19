// Category View
// =============

// Includes file dependencies
define([
    "jquery",
    "backbone",
    "views/settings" ],
    function($, Backbone, SettingsView) {

    //
    // ApplicationView is the top-level view that controls the other subviews.
    //
    // Main responsibilities:
    //
    //  - holds the two panels and the content pane
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
            'click #settings': 'settingsPane'
        },

        initialize: function() {
            var self = this;
            console.log("INIT:  ApplicationView");

            self.recommendationsCollection = self.options.recommendationsCollection;
            self.$container = undefined;

            // TODO(gercek): Implement NUX
            // If this is the first time using the app then

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

            return this;
        },




        settingsPane: function(e){
            e.preventDefault();

            // First hide the pane contents
            SA.snapper.expand('left');

            // Then render the settings view
            var view = new SettingsView();
            this.$container.html(view.render().$el);


            this.$container.show();

            // Finally bring pane back
            SA.snapper.close();

        },


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




