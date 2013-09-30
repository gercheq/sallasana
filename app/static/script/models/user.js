// User Model
// ==============

// Includes file dependencies
define([ "jquery", "backbone" ], function($, Backbone) {

    // The Model constructor
    var UserModel = Backbone.Model.extend({
        defaults: {
            first_name: '',
            last_name: '',
            location: '',
            email:''
        },
        url: function(){
            return 'api/user/';
        }
    });

    // Returns the Model class
    return UserModel;

} );
