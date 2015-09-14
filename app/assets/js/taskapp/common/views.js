App.module("Common.Views", function(Views, App, Backbone, Marionette, $, _) {

    Views.Form = Maronette.ItemView.extend({
        template: '#task-form',

        events: {
            "click button.js-submit": "submitClicked"
        },

        submitClicked: function (e) {
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger("form:submit", data);
            console.log("edit task");
        },

        onRender: function () {
            console.log(this.options.asModal)
            if (!this.options.asModal) {
                var $title = $("<h1>", {text: this.title});
                this.$el.prepend($title);
            }
        },

        onShow: function () {
            if (this.options.asModal) {
                this.$el.dialog({
                    modal: true,
                    title: this.title,
                    width: "auto"
                });
            }
        },

        onFormDataInvalid: function(errors) {
            console.log("Invalid Form Data", errors);
            var $view = this.$el;

            var clearFormErrors = function() {
                var $form = $view.find("form")
                $form.find(".help-block.has-error").each(function(){
                    $(this).remove()
                })

                $form.find(".form-group.has-error").each(function(){
                    $(this).removeClass("has-error");
                });
            }

            var self = this;
            var markErrors = function(value, key) {
                //console.log ("key", key)
                //console.log ("value", value)
                var $formGroup = self.$el.find("#task-" + key).parent();
                var $errorEl = $("<span>", {class: "help-block has-error", text: value});
                $formGroup.append($errorEl).addClass("has-error")
            }

            clearFormErrors();

            _.each(errors, markErrors)
        }
    });
});