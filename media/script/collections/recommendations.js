// Matches Collection
// ===================

// Includes file dependencies
define([ "jquery","backbone","models/user" ], function( $, Backbone, UserModel ) {

    // Extends Backbone.Router
    var RecommendationsCollection = Backbone.Collection.extend( {

        model: UserModel,

        // For now assume that the friends are recommendations
        url: '/api/fb/user/',

        initialize: function( models, options ) {

        },

        parse: function(response){

            // data coming from backend is not structured
            // so update values for template rendering
            // at collection parse time.
            _.each(response, function(recommendation) {
                recommendation.photo = recommendation.picture.picture.data.url;
                // TODO(Gercek): Calculate age from recommendation.birthday
                recommendation.age = 21;
            });

            return response;
        }

    });

    // Returns the Model class
    return RecommendationsCollection;

} );
