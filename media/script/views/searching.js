 define([
    "jquery",
    "backbone",
    "models/user",
    "collections/recommendations",
    "views/photo" ],
    function($, Backbone, UserModel, RecommendationsCollection, PhotoView) {

    var SearchingView = Backbone.View.extend( {

        className: 'subview',

        id: 'subview-searching',

        template: _.template($('#tmpl-searching').html()),

        events: {
        },

        initialize: function() {
            console.log("INIT:  SearchingView");
        },

        render: function() {
            console.log("RNDR:  SearchingView");
            var self = this;
            // render this view's template and append it to $el
            self.$el.html(self.template());
            return this;
        }


    } );

    // Returns the View class
    return SearchingView;

});




