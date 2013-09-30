// Category View
// =============

// Includes file dependencies
define([ "jquery", "backbone","models/user" ], function( $, Backbone, UserModel ) {

    // Extends Backbone.View
    var PhotoStackView = Backbone.View.extend( {


        template: _.template($('#tmpl-photo-stack').html()),

        events: {
            'click .like': 'like',
            'click .dislike': 'dislike'
        },

        initialize: function() {
            console.log("Initializing PhotoStackView");

        },

        render: function() {
            console.log("Rendering PhotoStackView");

            var tmpl = this.template;

            this.$el.html(tmpl);


        },

        like: function() {

        },

        dislike: function() {

        }

    } );

    // Returns the View class
    return PhotoStackView;

} );




