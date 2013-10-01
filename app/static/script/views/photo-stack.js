// Category View
// =============

// Includes file dependencies
define([ "jquery", "backbone","models/user", 'views/photo' ], function( $, Backbone, UserModel, PhotoView ) {

    //
    //
    //
    var PhotoStackView = Backbone.View.extend( {

        photoHeight: null,

        template: $('#tmpl-photo-stack').html(),

        events: {
            'click #btn-like': 'like',
            'click #btn-dislike': 'dislike'
        },

        initialize: function() {
            console.log("Initializing PhotoStackView");

            // this.photoFront;
            // this.photoBack;

        },

        render: function() {
            console.log("Rendering PhotoStackView");

            var renderedTemplate = _.template(this.template, this.recommendationsCollection);

            this.addPhotoToStack();

            this.$el.html(renderedTemplate);

            // Setup Photo Height
            if(!this.photoHeight){
                this.photoHeight = this.$el.find('.photo.twisted').width();
                this.$el.find('.photo').css('height', this.photoHeight);
            }

            this.temporary();

        },

        addPhotoToStack: function(){
          var self = this;
          var photoModel = this.recommendationsCollection.pop();

            debugger;

          var photoView = new PhotoView({
            height: self.photoHeight
          });

         var photo = photoView.render();
         this.$el.find('.photo.twisted').after(photo);


        },


        like: function(e) {
            debugger;
            this.addPhotoToStack()


        },

        dislike: function(e) {

            alert('DISLIKED');
        },



        temporary: function(){


            //
            // http://stackoverflow.com/questions/5023514/how-do-i-normalize-css3-transition-functions-across-browsers
            //
            function whichTransitionEvent(){
                var t;
                var el = document.createElement('fakeelement');
                var transitions = {
                  'transition':'transitionend',
                  'OTransition':'oTransitionEnd',
                  'MozTransition':'transitionend',
                  'WebkitTransition':'webkitTransitionEnd'
                }

                for(t in transitions){
                    if( el.style[t] !== undefined ){
                        return transitions[t];
                    }
                }
            }


//            $( document ).delegate("#page-recommendations", "pagebeforecreate", function() {

              var windowWidth = $(window).width(),
                  recommendationWidth = $('.recommendation.front').width(),
                  threshold = recommendationWidth,
                  currentPosition;


              $('.recommendation.front').pep({

                velocityMultiplier: 1.9,

                debug: false,

                initiate: function(e) {
                  // [≘ touchstart/mousedown] called when first touch / click event is triggered on the object
                  console.log("INITIATE");
                },

                start: function(e){
                  // called when dragging starts; when dx or dy are greater than startThreshold[0] or startThreshold[1]
                  console.log("START");
                },

                drag: function(e, obj) {
                  // [≘ touchmove/mousemove] called continuously while the object is dragging
                  console.log("DRAG");
                  console.log(obj.$el.position().left);
                },

                stop: function(e, obj) {
                  // [≘ touchend/mouseup] called when dragging stops
                  console.log("STOP");

                  // This is too early to check for transtion distance
                  // checkPositionAndMove(obj.$el, threshold);

                }

              });


              var transitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';
              $(".recommendation.front").on(transitionEnd, function(e, obj) {
                //do something
                console.log("TRANSITION ENDED");

                // This is too late to check for transtion distance
                // checkPositionAndMove( $(e.currentTarget), threshold);
              });

//            });



            function checkPositionAndMove($el, threshold) {
              var position = $el.position();


              if(position.left > threshold) {
                $.pep.unbind($el);
                $el.addClass('liked animated fadeOutRightBig').removeClass('disliked');
              } else if (position.left < -threshold){
                $.pep.unbind($el);
                $el.addClass('disliked animated fadeOutLeftBig').removeClass('liked');
              }

            }
        },


        recommendationsCollection: [
            {
                first_name: "Gercek",
                last_name: "AutoCS",
                user: 3056,
                time_updated: "2012-08-29T13:33:10",
                home: null,
                pending: false,
                best_username: "Gercek",
                id: 2392,
                time_created: "2012-08-29T13:33:10",
                email: "gercek+autocs@redbeacon.com"
            },
            {
                first_name: "Melis",
                last_name: "Karakus",
                user: 87282,
                time_updated: "2012-09-13T19:12:00",
                home: null,
                pending: false,
                best_username: "Melis",
                id: 4892,
                time_created: "2012-09-13T19:12:00",
                email: "melis+karakus@redbeacon.com"
            },
            {
                first_name: "Invited",
                last_name: "FromTask",
                user: 90382,
                time_updated: "2012-09-17T21:49:06",
                home: null,
                pending: false,
                best_username: "Invited",
                id: 5882,
                time_created: "2012-09-17T21:49:06",
                email: "gercek+invitedfromtask@redbeacon.com"
            },
            {
                first_name: "Second",
                last_name: "FromTask",
                user: 90392,
                time_updated: "2012-09-17T21:50:13",
                home: null,
                pending: false,
                best_username: "Second",
                id: 5892,
                time_created: "2012-09-17T21:50:13",
                email: "gercek+second@redbeacon.com"
            },
            {
            first_name: "Third ",
            last_name: "FromTask",
            user: 90402,
            time_updated: "2012-09-17T21:56:04",
            home: null,
            pending: false,
            best_username: "Third ",
            id: 5902,
            time_created: "2012-09-17T21:56:04",
            email: "gercek+third@redbeacon.com"
            },
            {
            first_name: "TEXAS",
            last_name: "A",
            user: 90422,
            time_updated: "2012-09-17T22:01:40",
            home: null,
            pending: false,
            best_username: "TEXAS",
            id: 5922,
            time_created: "2012-09-17T22:01:40",
            email: "gercek+texas@redbeacon.com"
            },
            {
            first_name: "a",
            last_name: "a",
            user: 107593,
            time_updated: "2012-10-27T00:46:52",
            home: null,
            pending: true,
            best_username: "a",
            id: 7363,
            time_created: "2012-10-27T00:46:52",
            email: "a"
            },
            {
            first_name: "Another",
            last_name: "One",
            user: 1141643,
            time_updated: "2013-04-12T18:52:29",
            home: null,
            pending: true,
            best_username: "Another",
            id: 193733,
            time_created: "2013-04-12T18:52:29",
            email: "gercek+another@redbeacon.com"
            }
            ]




    } );

    // Returns the View class
    return PhotoStackView;

});




