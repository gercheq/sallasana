// Category View
// =============

// Includes file dependencies
define([
    "jquery",
    "backbone",
    "models/user",
    "collections/recommendations",
    "views/photo" ],
    function($, Backbone, UserModel, RecommendationsCollection, PhotoView) {


    var PhotoStackView = Backbone.View.extend( {

        className: 'photo-stack-view',

        photoHeight: null,

        template: _.template($('#tmpl-photo-stack').html()),

        events: {
            'click #btn-like': 'like',
            'click #btn-dislike': 'dislike',
            'click #btn-info': 'showProfileDetails',
            'click .photo-stack': 'showProfileDetails',
            'click #close-details': 'hideProfileDetails'
        },

        initialize: function() {
            var self = this;
            console.log("INIT:  PhotoStackView");

            self.recommendationsCollection = self.options.recommendationsCollection;

//
//            SA.recommendationsCollection = new RecommendationsCollection();
//            SA.recommendationsCollection.fetch({ reset: true });
//
//            SA.recommendationsCollection.on('add remove reset', self.render, this);
        },

        render: function() {
            console.log("RNDR:  PhotoStackView");
            var self = this;

//            if(!SA.recommendationsCollection.length)
//                return

            // render this view's template and append it to $el
            self.$el.html(self.template());

            // initialize with the first two recommendations
            self._addPhoto();

            return this;
        },

        hideProfileDetails: function() {
          var self = this;

          self._hideProfileDetailsComponents();

          self._showRecommendationComponents();
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
        },

        like: function(e) {
            e.preventDefault();
            this._sendPhotoOut('bounceOutRight');
        },

        dislike: function(e) {
            e.preventDefault();
            this._sendPhotoOut('bounceOutLeft');
        },


        _sendPhotoOut: function(animationClass) {
            var self = this;

            // Animate the current photo and remove it from the dom as well
            var $currentPhoto = this.$el.find('.photo-card').last();

            $currentPhoto.addClass('animated ').addClass(animationClass);
            _.delay(function(){
                $currentPhoto.remove();
            }, 1000);

            // remove the element from the collection
            self.recommendationsCollection.shift();

            // Then add another one to the stack
            self._addPhoto();
        },


        showProfileDetails: function(e) {
            e.preventDefault();

            var self = this;

            self._hideRecommendationComponents();

            self._showProfileDetailsComponents();
        },


        _hideRecommendationComponents: function(){
            this.$currentPhoto = this.$el.find('.photo-card').last();

            // hide other photos so that they're not visible during transition
            this.$currentPhoto.siblings().hide();

            this.$currentPhoto.addClass('photo-card-active');

            // hide header and controls
            $('.ui-header').addClass('animated fadeOutUp');

            this.$el.find('.photo-controls').addClass('animated fadeOut');
        },

        _showRecommendationComponents: function() {

            // make other photos in stack visible again
            this.$currentPhoto.siblings().show();

            // zoom out current photo
            this.$el.find('.photo-card-active').removeClass('photo-card-active');

            // show header
            $('.ui-header').removeClass('fadeOutUp').addClass('animated fadeInDown');

            // show photo controls
            this.$el.find('.photo-controls').addClass('fadeIn').removeClass('fadeOut');

        },


        _showProfileDetailsComponents: function(){
            var self = this;
            self.$el.find('#pane-profile-details').addClass('animated bounceInUp').removeClass('bounceOutDown');
            self.$el.find('#header-profile-details').addClass('animated slideInDown').removeClass('slideOutUp');

        },

        _hideProfileDetailsComponents: function(){
            var self = this;

            // hide details pane
            self.$el.find('#pane-profile-details').addClass('bounceOutDown').removeClass('bounceInUp');

            // hide details header
            self.$el.find('#header-profile-details').addClass('slideOutUp').removeClass('slideInDown');
        }

    } );

    // Returns the View class
    return PhotoStackView;

});




