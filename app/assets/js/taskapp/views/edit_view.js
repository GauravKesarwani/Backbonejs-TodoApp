App.module("EditTask", function(EditTask, App, Backbone, Marionette, $, _){
  EditTask.View = App.Common.Views.Form.extend({

    initialize: function() {
      this.title = "Edit " + this.model.get("taskName");
    }
  });
});