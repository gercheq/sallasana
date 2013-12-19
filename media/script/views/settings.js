 define([
    "jquery",
    "backbone" ],
    function($, Backbone) {

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

            return this;
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




