requirejs.config({
    baseUrl: "assets/js",
    paths: {
        jquery: "vendor/jquery/jquery",
        underscore: "vendor/underscore/underscore",
        json2: "vendor/json2/json2",
        backbone: "vendor/backbone/backbone",
        localstorage: "vendor/backbone.localstorage/backbone.localstorage",
        marionette: "vendor/marionette/lib/backbone.marionette",  
    },

    shim: {
        backbone:{
            deps: [
                "jquery",
                "underscore",
                "json2"],

            exports: "Backbone"
        },

        marionette: {
            deps: ["backbone"],
            exports: "Marionette"
        },
        localstorage: {
            deps: ["backbone"]
        }
    }
});

require([
  'app',
], function(App) {
  'use strict'
/*
    Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
        return dust.compile(rawTemplate, rawTemplate);
    };

    /**
     * Override the default marionette render function to allow synchronous dust rendering
     * @param template
     * @param data
     * @returns {string}
     */

   /* Marionette.Renderer.render = function(template, data) {
        var result = '';

        dust.render(template, data, function(err, html) {
            if (err) {
                throw err;
            }

            result = html;
        });

        return result;
    };

   App.start();
  
   return App; */

   //Define a navWidget Module

   

   App.start();


});