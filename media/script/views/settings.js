 define([
    "jquery",
    "backbone",
    "jquery.nouislider",
    "bootstrap-switch"],
    function($, Backbone){

    var SettingsView = Backbone.View.extend( {

        className: 'subview',

        id: 'subview-settings',

        template: _.template($('#tmpl-settings').html()),

        events: {
            'click #update-sex': 'updateSex',
            'click #update-distance': 'updateDistance',
            'click #update-ages': 'updateAges',
            'click #update-looking-for': 'updateLookingFor'
        },

        initialize: function() {
            var self = this;
            console.log("INIT:  SettingsView");

        },

        render: function() {
            console.log("RNDR:  SettingsView");
            var self = this;

            // render this view's template and append it to $el
            self.$el.html(self.template());

            self._initDistanceAndAgeSliders();

            self._initSwitches();

            return this;
        },

        _initSwitches: function(){
            var self = this,
                $male = self.$el.find('#male'),
                $female = self.$el.find('#female');

            $male.bootstrapSwitch();
            $female.bootstrapSwitch();

            $male.on('switch-change', function (e, data) {
                var $el = $(data.el)
                , value = data.value;
                console.log(e, $el, value);
            });
        },

        _initDistanceAndAgeSliders: function(){
            var self = this,
                $distanceBoard = self.$el.find("#distance-board"),
                $ageLow = self.$el.find('#age-low'),
                $ageHigh = self.$el.find('#age-high');


            self.$el.find('#ages').noUiSlider({
                range: [18,50],
                start: [18,30],
                handles: 2,
                connect: true,
                serialization: {
                    to: [
                      [$ageLow, 'html'],
                      [$ageHigh, 'html']
                    ],
                    resolution: 1
                },
                set: function(){
                    // display 50+ on the upper bound
                    if(this.val()[1] == 50){
                        $ageHigh.html('50+');
                    }
                }
            });


            self.$el.find('#distance').noUiSlider({
                 range: [1, 200],
                 start: 50,
                 handles: 1,
                 connect: "lower",
                 serialization: {
                    to: [ $distanceBoard, 'html' ],
                    resolution: 1
                },
                set: function(){
                    // display 200+ on the upper bound
                    if(this.val() == 200){
                        $distanceBoard.html('200+');
                    }
                }
            });

        },


        updateSex: function(){
            console.log('updating');
        },
        updateDistance: function(){
            console.log('updating');
        },
        updateAges: function(){
            console.log('updating');
        },
        updateLookingFor: function(){
            console.log('updating');
        }


    } );

    // Returns the View class
    return SettingsView;

});




