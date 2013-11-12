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
            'click #btn-info': 'showProfileDetails'
//            'tap .photo': 'showProfileDetails'
        },

        initialize: function() {
            var self = this;
            console.log("INIT:  PhotoStackView");
            self.recommendationsCollection = self.options.recommendationsCollection;
        },

        render: function() {
            console.log("RNDR:  PhotoStackView");
            var self = this;

            // render this view's template and append it to $el
            self.$el.html(self.template());

            // initialize with the first two recommendations
            self._addPhoto();
            self._addPhoto();

            return this;
        },

        _addPhoto: function(){
            console.log('Adding a new photo...')
            var self = this;

            // take the first recommendation and
            // add it to the .photo-stack
            var currentModel = self.recommendationsCollection.shift();
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

            // Then add another one to the stack
            self._addPhoto();
        },


        showProfileDetails: function(e) {

            e.preventDefault();

            var self = this;

            // Setup current photo
            self.$currentPhoto = $(e.currentTarget);

            // Disable touch and drag
            $.pep.unbind(self.$currentPhoto);


            // Setup fullscreen styles w/ an extra class
            self.$currentPhoto.addClass('photo-active');
            self.$currentPhoto.parents('.photo-stack').css('position','static');

            self._hideComponents();

            self._displayDetailsPane();
        },


        _hideComponents: function(){
            this.$currentPhoto.siblings().hide();


            $('.ui-header').addClass('animated fadeOutUp');
            $('.photo-controls').addClass('animated fadeOut');


            this.$currentPhoto.find('.name-age, .stats').hide();

        },

        _showComponents: function() {
            $('.ui-header').removeClass('fadeOutUp').addClass('fadeInTop');
        },

        _displayDetailsPane: function() {
            var self = this;
            $('#pane-photo-details').addClass('animated bounceInUp')


        }



    } );

    // Returns the View class
    return PhotoStackView;

});




