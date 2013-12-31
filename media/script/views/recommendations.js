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
            'click #btn-like': 'like',
            'click #btn-dislike': 'dislike',
            'swipeleft .photo-card': '_swipeLeft',
            'swiperight .photo-card': '_swipeRight',
            'dragleft .photo-card': '_stickToFinger',
            'dragright .photo-card': '_stickToFinger',
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
            self.dislike();
            ev.gesture.stopDetect();
            ev.gesture.preventDefault(); // disable browser scrolling
        },

        _swipeRight: function(ev) {
            console.log('Swiped Right');
            var self = this;
            self.like();
            ev.gesture.stopDetect();
            ev.gesture.preventDefault(); // disable browser scrolling

        },

        _stickToFinger: function(ev){
            console.log('Sticking to finger');
            ev.gesture.preventDefault(); // disable browser scrolling
//
//
//            // stick to the finger
//            var pane_offset = -(100/pane_count)*current_pane;
//            var drag_offset = ((100/pane_width)*ev.gesture.deltaX) / pane_count;
//
//            // slow down at the first and last pane
//            if ((current_pane == 0 && ev.gesture.direction == Hammer.DIRECTION_RIGHT) ||
//               (current_pane == pane_count-1 && ev.gesture.direction == Hammer.DIRECTION_LEFT)) {
//                drag_offset *= .4;
//            }
//
//            setContainerOffset(drag_offset + pane_offset);
        },

        _release: function(ev) {
            console.log('Card released');
            var self = this;
            ev.gesture.preventDefault(); // disable browser scrolling

//            // more then 50% moved, navigate
//            if(Math.abs(ev.gesture.deltaX) > pane_width/2) {
//                if(ev.gesture.direction == 'right') {
//                    self.prev();
//                } else {
//                    self.next();
//                }
//            }
//            else {
//                self.showPane(current_pane, true);
//            }
        }



    } );

    // Returns the View class
    return RecommendationsView;

});




