// User Model
// ==============

// Includes file dependencies
define([ "jquery", "backbone" ], function($, Backbone) {

    // The Model constructor
    var UserModel = Backbone.Model.extend({
        defaults: {
            first_name: "",
            last_name: "",
            age: '',
            shared_interests: '0',
            shared_friends: '0',
        },
        url: function(){
            return 'api/user/';
        }
    });

    // Returns the Model class
    return UserModel;

} );
