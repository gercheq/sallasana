// Category View
// =============

// Includes file dependencies
define([ "jquery", "backbone","models/user" ], function( $, Backbone, UserModel ) {

    // Extends Backbone.View
    var PhotoStackView = Backbone.View.extend( {


        template: '#template-photo-stack',

        events: {
            'click .like': 'like',
            'click .dislike': 'dislike'
        },

        initialize: function() {

        },

        render: function() {

        },

        like: function() {

        },

        dislike: function() {

        }

    } );

    // Returns the View class
    return PhotoStackView;

} );




