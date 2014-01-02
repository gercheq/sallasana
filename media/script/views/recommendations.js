 define([
    "modernizr",
    "jquery",
    "backbone",
    "models/user",
    "collections/recommendations",
    "views/photo" ],
    function(Modernizr, $, Backbone, UserModel, RecommendationsCollection, PhotoView) {

    var RecommendationsView = Backbone.View.extend( {

        className: 'subview',

        id: 'subview-recommendations',

        template: _.template($('#tmpl-recommendations').html()),

        events: {
            'click #btn-like': 'like',
            'click #btn-dislike': 'dislike',
            'swipeleft .photo-card': '_swipeLeft',
            'swiperight .photo-card': '_swipeRight',
            'drag .photo-card': '_stickToFinger',
            'release .photo-card': '_release'
        },



        initialize: function() {
            var self = this;
            console.log("INIT:  RecommendationsView");

            self.recommendationsCollection = self.options.recommendationsCollection;
            self.eventAggregator = self.options.eventAggregator;

        },

        render: function() {
            console.log("RNDR:  RecommendationsView");
            var self = this;


            //
            // Render searching automatically if the collection is empty
            // otherwise render photos
            //
            if(self.recommendationsCollection.isEmpty()){
                self.renderSearching()
            } else {

                // render this view's template and append it to $el
                self.$el.html(self.template());

                // Initialize touch
                self.$el.hammer({ drag_lock_to_axis: true });

                // Add first photo
                self._addPhoto();
            }

            return this;
        },


        like: function(e) {
            console.log('like');
            this._sendPhotoOut('bounceOutRight');
        },

        dislike: function() {
            console.log('dislike');
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


        _addPhoto: function(index){
            // if not defined add the first element directly
            var self = this;
            var index = index || 0;

            if (!self.recommendationsCollection.isEmpty()){
                // take the first recommendation and
                // add it to the .photo-stack
                var currentModel = self.recommendationsCollection.at(index);

                console.log('Adding a new photo... Username: %s', currentModel.get('username'));

                var photoView = new PhotoView({
                    model: currentModel
                });
                var renderedTemplate = photoView.render().$el;

                self.$el.find('.photo-stack').prepend(renderedTemplate);
            } else {
                //
                // No more recommendations so trigger rendering searching
                //
                self.eventAggregator.trigger('render:searching');
            }

        },


        //
        // TOUCH EVENTS
        //
        _swipeLeft: function(ev){
            console.log('Swiped Left');
            var self = this;
            ev.gesture.stopDetect();
            ev.gesture.preventDefault(); // disable browser scrolling

            self.dislike();
        },

        _swipeRight: function(ev) {
            console.log('Swiped Right');
            var self = this;
            ev.gesture.stopDetect();
            ev.gesture.preventDefault(); // disable browser scrolling

            self.like();
        },

        _stickToFinger: function(ev){
            console.log('Sticking to finger');
            ev.gesture.preventDefault(); // disable browser scrolling

            var self = this,
                offsetX = ev.gesture.deltaX,
                offsetY = ev.gesture.deltaY,
                $photoCard = this.$el.find('.photo-card').last();

            self._setPosition($photoCard, offsetX, offsetY);
        },

        _release: function(ev) {
            console.log('Card released');
            var self = this,
                $photoCard = this.$el.find('.photo-card').last();
            ev.gesture.preventDefault(); // disable browser scrolling

            // more then 50% moved, navigate
            if(Math.abs(ev.gesture.deltaX) > SA.viewport.width/2) {
                if(ev.gesture.direction == 'right') {
                    self.like();
                } else {
                    self.dislike();
                }
            }
            else {
                self._setPosition($photoCard, 0, 0);
            }
        },

        _setPosition: function($el, x, y){
            if(Modernizr.csstransforms3d) {
                $el.css("transform", "translate3d("+ x +"px,"+ y +"px,0) scale3d(1,1,1)");
            }
            else if(Modernizr.csstransforms) {
                $el.css("transform", "translate("+ x +"px,"+ y + ")");
            }
            else {
                $el.css({
                    "left": x +"px",
                    "top": y +"px"
                });
            }
        }


    } );

    // Returns the View class
    return RecommendationsView;

});




