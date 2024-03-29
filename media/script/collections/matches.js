// Matches Collection
// ===================

// Includes file dependencies
define([ "jquery","backbone","models/user" ], function( $, Backbone, UserModel ) {

    // Extends Backbone.Router
    var MatchesCollection = Backbone.Collection.extend( {

        // The Collection constructor
        initialize: function( models, options ) {
            console.log()
            // Sets the type instance property (ie. animals)
            // this.type = options.type;

        },

        // Sets the Collection model property to be a Category Model
        model: UserModel,

        url: 'api/matches/'


    } );

    // Returns the Model class
    return MatchesCollection;

} );
