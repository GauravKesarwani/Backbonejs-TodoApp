App.module("EditTask", function(EditTask, App, Backbone, Marionette, $, _) {
  EditTask.Controller = {
    editTask: function(id) {
      var loadingView = new App.Common.Loading.Spinner({
        title: "Artificial Loading Delay",
        message: "Data loading is delayed to demonstrate using a loading view."
      });
      App.regions.main.show(loadingView);
      var fetchingTask = App.request("task:entity", id);
      $.when(fetchingTask).done(function(task) {
        var view;
        if (task !== undefined) {
          view = new EditTask.View({
              model: task
          });

          view.on("form:submit", function(data) {
            console.log(data);
            console.log("view submit event");
            if(task.save(data)) {
              App.trigger("task:show", task.get("id"));
            }
            else {
              //console.log(task.validationError);
              //console.log(task.validationMessage);
              view.triggerMethod("form:data:invalid", task.validationError);
            }
          })
        } 
        App.regions.main.show(view);
      });
    }
  };
});
