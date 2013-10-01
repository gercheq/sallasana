// Category View
// =============

// Includes file dependencies
define([ "jquery", "backbone","models/user" ], function( $, Backbone, UserModel ) {

    //
    //
    //
    var PhotoView = Backbone.View.extend( {

        template: _.template($('#tmpl-photo').html()),

        events: {
            'click #btn-like': 'like',
            'click #btn-dislike': 'dislike'
        },

        initialize: function() {
            console.log("Initializing PhotoView");

            // this.photoFront;
            // this.photoBack;

            debugger;

            this.$el.pep();

        },

        render: function() {
            console.log("Rendering PhotoView");

            this.$el.pep();
                        debugger;

            return this.template;
        },

        like: function(e) {
            debugger;


        },

        dislike: function(e) {

            alert('DISLIKED');
        }

    } );

    return PhotoView;

});




