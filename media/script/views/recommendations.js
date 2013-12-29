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

            self.$el.hammer({ drag_lock_to_axis: true }).on("release dragleft dragright swipeleft swiperight", self.handleHammer);

            self._addPhoto();


            return this;
        },

        handleHammer: function(ev){
            var self = this;
            console.log(ev);
            // disable browser scrolling
            ev.gesture.preventDefault();

            switch(ev.type) {
//                case 'dragright':
//                case 'dragleft':
//                    // stick to the finger
//                    var pane_offset = -(100/pane_count)*current_pane;
//                    var drag_offset = ((100/pane_width)*ev.gesture.deltaX) / pane_count;
//
//                    // slow down at the first and last pane
//                    if((current_pane == 0 && ev.gesture.direction == Hammer.DIRECTION_RIGHT) ||
//                        (current_pane == pane_count-1 && ev.gesture.direction == Hammer.DIRECTION_LEFT)) {
//                        drag_offset *= .4;
//                    }
//
//                    setContainerOffset(drag_offset + pane_offset);
//                    break;

                case 'swipeleft':
                    self.dislike();
                    ev.gesture.stopDetect();
                    break;

                case 'swiperight':
                    self.like();
                    ev.gesture.stopDetect();
                    break;

//                case 'release':
//                    // more then 50% moved, navigate
//                    if(Math.abs(ev.gesture.deltaX) > pane_width/2) {
//                        if(ev.gesture.direction == 'right') {
//                            self.prev();
//                        } else {
//                            self.next();
//                        }
//                    }
//                    else {
//                        self.showPane(current_pane, true);
//                    }
//                    break;
            }

        },









        like: function(e) {
            console.log('like');
            e.preventDefault();
            this._sendPhotoOut('bounceOutRight');
        },

        dislike: function(e) {
            console.log('dislike');
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




