 define([
    "jquery",
    "backbone",
    "models/user",
    "collections/recommendations",
    "views/photo" ],
    function($, Backbone, UserModel, RecommendationsCollection, PhotoView) {

    var RecommendationsView = Backbone.View.extend( {

        className: 'subview',

        id: 'subview-recommendations',

        template: _.template($('#tmpl-recommendations').html()),

        events: {
            'click #like': 'like',
            'click #dislike': 'dislike'
        },

        initialize: function() {
            var self = this;
            console.log("INIT:  RecommendationsView");

            self.recommendationsCollection = self.options.recommendationsCollection;



        },

        render: function() {
            console.log("RNDR:  RecommendationsView");
            var self = this;

            // render this view's template and append it to $el
            self.$el.html(self.template());

            debugger;
            self._addPhoto();

            return this;
        },

        like: function(){
            console.log('like');
        },
        dislike: function(){
            console.log('dislike');
        },




        _addPhoto: function(index){
            // if not defined add the first element directly

            index = index || 0;

            var self = this;

            // take the first recommendation and
            // add it to the .photo-stack
            var currentModel = self.recommendationsCollection.at(index);

            console.log('Adding a new photo... Username: %s', currentModel.get('username'));

            var photoView = new PhotoView({
                model: currentModel
            });
            var renderedTemplate = photoView.render().$el;

            self.$el.find('.photo-stack').prepend(renderedTemplate);
        }






    } );

    // Returns the View class
    return RecommendationsView;

});




