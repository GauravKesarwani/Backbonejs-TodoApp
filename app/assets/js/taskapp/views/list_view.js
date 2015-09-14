App.module("List", function(List, App, Backbone, Marionette, $, _){
  List.Task = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#task-list-item",

    events: {
      "click": "highlightName",
      "click td a.js-show": "showClicked",
      "click td a.js-edit": "editClicked",
      "click button.js-delete": "deleteClicked"
    },

    deleteClicked: function(e) {
      e.stopPropagation(); 
      //alert("delete button was clicked"); 
     // this.model.collection.remove(this.model);
      this.trigger("task:delete", this.model);
    },

    editClicked: function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.trigger("task:edit", this.model);
    },

    showClicked: function(e){
      e.preventDefault();
      e.stopPropagation();
      this.trigger("task:show",this.model);
    },

    highlightName: function(e){
      e.preventDefault();
      this.$el.toggleClass("warning");
    },

    remove: function(){
      //need to remove the DOM element when it has finished fading out
      //this.$el.fadeOut();
      //to achieve this provide a callback function
      var self = this;
      this.$el.fadeOut(function() {
        Marionette.ItemView.prototype.remove.call(self);
      })
    }
  });

  List.Tasks = Marionette.CompositeView.extend({
    tagName: "table",
    className: "table table-hover",
    template: "#task-list",
    childView: List.Task,
    childViewContainer: "tbody",

    onChildviewTaskDelete: function() {
      this.$el.fadeOut(1000, function() {
        $(this).fadeIn(1000);
      });
    }
  });

  List.Layout = Marionette.LayoutView.extend({
    template: "#task-list-layout",

    regions: {
      panelRegion: "#panel-region",
      tasksRegion: "#tasks-region"
    }
  });

  List.Panel = Marionette.ItemView.extend({
    template: "#task-list-panel"

    triggers: {
      "click button.js-new": "task:new"
    }
  })
});