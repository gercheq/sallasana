// User Model
// ==============

// Includes file dependencies
define([ "jquery", "backbone" ], function($, Backbone) {

    // The Model constructor
    var UserModel = Backbone.Model.extend({
        defaults: {
            avatar: "",
            birthday: null,
            common_friends: [],
            common_likes: [],
            dislike_link: "",
            first_name: "",
            gender: "female",
            id: 0,
            last_name: "",
            like_link: "",
            photo: "https://graph.facebook.com/xxx/picture?width=220&height=220",
            photos: [],
            username: ""

        }
//        ,
//        url: function(){
//            return '/api/user/';
//        }
    });

    // Returns the Model class
    return UserModel;

} );
