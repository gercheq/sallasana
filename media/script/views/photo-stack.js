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
            'click .photo-stack': 'showProfileDetails'
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
            self._addPhoto(1);

            return this;
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

            // First hide unnecessary elements
            self.$el.find('.photo-controls').hide()

            // Setup fullscreen styles w/ an extra class


            // Zoom into the current card

            // Slide Up Header

            self._hideComponents();

            self._displayDetailsPane();
        },


        _hideComponents: function(){
            this.$currentPhoto = this.$el.find('.photo-card').last();

            // hide other photos so that they're not visible during transition
            this.$currentPhoto.siblings().hide();

            this.$currentPhoto.addClass('photo-card-active');

            // hide header and controls
            $('.ui-header').addClass('animated fadeOutUp');
            $('.photo-controls').addClass('animated fadeOut');

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




