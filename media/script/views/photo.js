//
// PhotoView renders each card, tapping on the photo opens the PhotoDetailsView
//
//
// ============================================================================

// Includes file dependencies
define([ "jquery", "backbone","models/user" ], function( $, Backbone, UserModel ) {

    //
    //
    //
    var PhotoView = Backbone.View.extend( {

        tag: "div",

        className: "photo-card",

        template: _.template($('#tmpl-photo').html()),

        events: {
            'click #btn-like': 'like',
            'click #btn-dislike': 'dislike'
        },

        initialize: function() {
            console.log("INIT:  PhotoView");
        },

        render: function() {
            console.log("RNDR:  PhotoView");
            var tmpl = this.template(this.model.toJSON());
            this.$el.html(tmpl);
            return this;
        },

        like: function(e) {
            console.log("LIKE");


        },

        dislike: function(e) {
            console.log("DISLIKE");
        }

    } );

    return PhotoView;

});




