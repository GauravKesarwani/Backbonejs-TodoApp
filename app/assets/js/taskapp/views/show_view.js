App.module("Show", function(Show, App, Backbone, Marionette, $, _){
  Show.Task = Marionette.ItemView.extend({
    template: '#task-view',

    events: {
      "click  a.js-edit": "editClicked"
    },

    editClicked: function(e) {
      e.preventDefault();
      this.trigger("task:edit", this.model);
    }
  });

  Show.MissingTask = Marionette.ItemView.extend({
    template: '#missing-task-view'
  });
});