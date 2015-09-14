// author @Gaurav Kesarwani
/*

 This is application router.
 
 In traditional web frameworks actions are triggered by hitting the corresponding url.
 This isn't true for javascript web appilications.
 
 Router will get triggered only by the first url it recognizes. After that the router only keeps the url upto date
 as the user navigates our app, changing the displayed content is handled by the controller.
*/

App.module("TasksApp", function(TasksApp, App, Backbone, Marionette, $, _){
  TasksApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "tasks": "listTasks",
      "tasks/:id": "showTask",
      "tasks/:id/edit": "editTask"
    }
  });

  //controller. The callbacks method specified in the appRoutes must be defined in the router controller.
  var API = {
    listTasks: function(){ 
      console.log("route to list contacts was triggered");
      App.List.Controller.listTasks();
    },

    showTask: function(id) {
      App.Show.Controller.showTask(id);
    },

    editTask: function(id) {
      App.EditTask.Controller.editTask(id);
    }
  }

  App.on("tasks:list", function() {
    App.navigate("tasks");
    API.listTasks();
  });

  App.on("task:show", function(id) {
    App.navigate("tasks/" + id);
    console.log(id);
    API.showTask(id);
  });

  App.on("task:edit", function(id){
    App.navigate("tasks/" + id + "/edit");
    API.editTask(id);
  });

  TasksApp.on("start", function(){ 
    new TasksApp.Router({
    controller: API
    });
  });
});