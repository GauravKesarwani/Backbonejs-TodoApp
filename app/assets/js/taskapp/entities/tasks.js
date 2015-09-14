App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
  Entities.Task = Backbone.Model.extend({
    urlRoot: "tasks",

    validate: function(attrs, options){
      console.log(attrs);
      var errors = {}

      if (! attrs.taskName)
        errors.taskName = "Task Name cannot be blank"

      if (! attrs.taskPriority)
        errors.taskPriority = "Task Priority cannot be blank"

      if (! _.isEmpty(errors))
        return errors;
    }
  });



  Entities.configureStorage("App.Entities.Task");

  Entities.TasksCollection = Backbone.Collection.extend({
    url: "tasks",
    model: Entities.Task,
    comparator: "taskPriority"
  });

  Entities.configureStorage("App.Entities.TasksCollection");

  var tasks;

  var initializeTasks = function() {
    tasks = new Entities.TasksCollection([
       {
        id: 1,
        taskName: 'Wash Clothes',
        taskPriority: '1'
      },
      {
        id: 2,
        taskName: 'Practice Marionette',
        taskPriority: '3'
      },
      {
        id: 3,
        taskName: 'Play Volleyball',
        taskPriority: '3'
      }
    ]);
    tasks.forEach(function(task) {
      task.save();
    });

    return tasks.models;
  };

  var API = {
    getTasksEntities: function() {
      console.log("Inside tasks entities")
      var tasks = new Entities.TasksCollection();
      var defer = $.Deferred();
    
      tasks.fetch({
        success: function(data) {
          console.log(data);
          console.log("Task fetch success");
          defer.resolve(data);
        }
      });

      var promise = defer.promise();
      $.when(promise).done(function(fetchedTasks){
        if(fetchedTasks.length === 0) {
          var model = initializeTasks();
          tasks.reset(model);
        }
      });
      return promise;

      // Code doesn't deal with latency. If the length is checked before the data 
      // has returned from server. 
      // Use jquery defer to deal with latency.
      //if (tasks.length === 0) {
      //  return initializeTasks();
      //}
      //return tasks;
    },
    getTaskEntity: function(taskId) {
      console.log("Get Task " , taskId)
      var task = new Entities.Task({id: taskId});
      var defer = $.Deferred();
      setTimeout(function(){
        task.fetch({
          success: function(data) {
            defer.resolve(data);
          },
          error: function(data) {
            defer.resolve(undefined);
          }
        });
      }, 2000);
      
      return defer.promise();
    }
  }

  //attach a request handler for tasks entities
  App.reqres.setHandler("task:entities", function() {
    return API.getTasksEntities();
  });

  // Attach a request handler for task entity
  App.reqres.setHandler("task:entity", function(id) {
    return API.getTaskEntity(id);
  });
});