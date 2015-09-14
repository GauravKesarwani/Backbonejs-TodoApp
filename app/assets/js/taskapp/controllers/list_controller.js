App.module("List", function(List, App, Backbone, Marionette, $, _) {
  List.Controller = {
    listTasks: function() {
      var tasksListView;
      var loadingView = new App.Common.Loading.Spinner();
      App.regions.main.show(loadingView);
      
      var fetchingTasks = App.request("task:entities");

      var tasksListLayout = new List.Layout();
      var tasksListPanel = new List.Panel();

      $.when(fetchingTasks).done(function(tasks){
         tasksListView = new List.Tasks({
            collection: tasks
          });
        });

      tasksListLayout.on("show", function(){
        tasksListLayout.panelRegion.show(tasksListPanel);
        tasksListLayout.tasksRegion.show(tasksListView);
      })
     
      tasksListView.on("childview:task:delete", function(childview, model) {
        tasks.remove(model);
      });
      
      tasksListView.on("childview:task:show", function(childview, model) {
        App.trigger("task:show",model.get("id"))
      });

      tasksListView.on("childview:task:edit", function(childview,model){
        var view = new App.EditTask.View({
          model: model,
          title: view.title,
          asModal: true
        })

        view.on("show", function() {
          this.$el.dialog({
            modal: true,
            width: "auto"
          })
        });

        App.regions.dialog.show(view);
      });
      App.regions.main.show(tasksListLayout);
  }
 }
});