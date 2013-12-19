 define([
    "jquery",
    "backbone" ],
    function($, Backbone) {

    var RecommendationsView = Backbone.View.extend( {

        className: 'subview',

        id: 'subview-recommendations',

        template: _.template($('#tmpl-recommendations').html()),

        events: {
            'click #like': 'like',
            'click #dislike': 'dislike'
        },

        initialize: function() {
            var self = this;
            console.log("INIT:  RecommendationsView");

        },

        render: function() {
            console.log("RNDR:  RecommendationsView");
            var self = this;

            // render this view's template and append it to $el
            self.$el.html(self.template());

            return this;
        },

        like: function(){
            console.log('like');
        },
        dislike: function(){
            console.log('dislike');
        }


    } );

    // Returns the View class
    return RecommendationsView;

});




