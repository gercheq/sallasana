// Matches Collection
// ===================

// Includes file dependencies
define([ "jquery","backbone","models/user" ], function( $, Backbone, UserModel ) {

    // Extends Backbone.Router
    var RecommendationsCollection = Backbone.Collection.extend( {

        model: UserModel,

        // For now assume that the friends are recommendations
        url: '/api/recs',

        initialize: function( models, options ) {

        },

        parse: function(response){
            // data coming from backend is not structured
            // so update values for template rendering
            // at collection parse time.
            _.each(response.recs, function(recommendation) {
                recommendation.photo = "https://graph.facebook.com/" + recommendation.username + "/picture?width=220&height=220"
                 // TODO(Gercek): Calculate age from recommendation.birthday
                recommendation.age = 21;
            });

            return response.recs;
        },

        parseInline: function(recommendations){
            var photoURL = "";
            _.each(recommendations.models, function(recommendation) {

                photoURL =  "https://graph.facebook.com/" + recommendation.get('username') + "/picture?width=220&height=220"
                recommendation.set({ 'photo': photoURL});
                 // TODO(Gercek): Calculate age from recommendation.birthday
                recommendation.set({ 'age' : '21'});
            });

        }

    });

    // Returns the Model class
    return RecommendationsCollection;

} );
