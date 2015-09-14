App.module("Show", function(Show, App, Backbone, Marionette, $, _ ) {
  Show.Controller = {
    showTask: function(id) {
      console.log("Inside Show Controller " + id);
      var loadingView = new App.Common.Loading.Spinner({
        title: "Artificial Loading Delay",
        message: "Wait for Task to show"
      });
      App.regions.main.show(loadingView);
      //var tasks = App.request("task:entities")
      //var model = tasks.get(id);
      var fetchingTask = App.request("task:entity", id);
      // console.log(task);
      $.when(fetchingTask).done(function(task){
        var taskView;
        if (task!== undefined) {
           taskView = new Show.Task({
            model: task
          });
        }
        else {
          taskView = new Show.MissingTask();
        }

        taskView.on("task:edit", function(task) {
          App.trigger("task:edit",task.get("id"));
        }) 
        App.regions.main.show(taskView);
      });
    } 
  }
});