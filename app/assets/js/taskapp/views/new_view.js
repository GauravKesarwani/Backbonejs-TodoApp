App.module("NewTask", function(NewTask, App, Backbone, Marionette, $, _) {
    NewTask.View = App.Common.Views.Form.extend({
        title: "New Task"
    })
})