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
            photo: "http://m.c.lnkd.licdn.com/media/p/2/000/0b7/233/26a567e.jpg"
        },
        url: function(){
            return 'api/user/';
        }
    });

    // Returns the Model class
    return UserModel;

} );
