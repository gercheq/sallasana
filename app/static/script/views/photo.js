// Category View
// =============

// Includes file dependencies
define([ "jquery", "backbone","models/user" ], function( $, Backbone, UserModel ) {

    //
    //
    //
    var PhotoView = Backbone.View.extend( {

        tag: "div",

        className: "photo",

        template: _.template($('#tmpl-photo').html()),

        events: {
            'click #btn-like': 'like',
            'click #btn-dislike': 'dislike'
        },

        initialize: function() {
            console.log("Initializing PhotoView");

            // this.photoFront;
            // this.photoBack;

        },

        render: function() {
            console.log("Rendering PhotoView");



//            var el = this.$el.html(this.template(_.extend(data, {
//                mytask: data.submitted_user && (data.submitted_user.id == $('body').data('uid')),
//                isRegisteredUser: this.memberCollection.isRegisteredUser()
//            })));




            var el = this.$el.html(this.template());
            el.pep();
            return el


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




