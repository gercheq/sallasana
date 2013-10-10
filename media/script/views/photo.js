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
            console.log("INIT:  PhotoView");

            // this.photoFront;
            // this.photoBack;

        },

        render: function() {
            console.log("RNDR:  PhotoView");



//            var el = this.$el.html(this.template(_.extend(data, {
//                mytask: data.submitted_user && (data.submitted_user.id == $('body').data('uid')),
//                isRegisteredUser: this.memberCollection.isRegisteredUser()
//            })));



            var tmpl = this.template(this.model.toJSON());

            var el = this.$el.html(tmpl);

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




