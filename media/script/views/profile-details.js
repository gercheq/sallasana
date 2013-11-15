//
// ProfileDetailsView renders each card, tapping on the photo opens the ProfileDetailsView
//
//
// ============================================================================

// Includes file dependencies
define([ "jquery", "backbone","models/user" ], function( $, Backbone, UserModel ) {

    //
    //
    //
    var ProfileDetailsView = Backbone.View.extend( {

        tag: "div",

        className: "profile-details",

        template: _.template($('#tmpl-profile-details').html()),

        events: {
            'click #btn-like': 'like',
            'click #btn-dislike': 'dislike'
        },

        initialize: function() {
            console.log("INIT:  ProfileDetailsView");

            // this.photoFront;
            // this.photoBack;

        },

        render: function() {
            console.log("RNDR:  ProfileDetailsView");


            var tmpl = this.template(this.model.toJSON());

            var el = this.$el.html(tmpl);

            // WHY DOESN'T IT WORK HERE?
            // this.$el.find('.photo').pep();


            return this;
        },

        like: function(e) {
            console.log("LIKE");


        },

        dislike: function(e) {
            console.log("DISLIKE");
        }

    } );

    return ProfileDetailsView;

});




