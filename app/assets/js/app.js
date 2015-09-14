var App = new Marionette.Application();

//Declare Skills and AboutMe Model
//App.Aboutme = Backbone.Model.extend({})
//App.Skills = Backbone.Model.extend({});

/*
App.SkillsView = Marionette.ItemView.extend({
  el: "#skills-region",
  template: "#static-template"
});
*/

App.navigate = function(route,options) {
  options || (options = {});
  Backbone.history.navigate(route, options);
}

App.getCurrentRoute = function() {
  return Backbone.history.fragment;
}
/* Note: When a module starts , it starts all of its submodule first. */

App.on("before:start", function() {
  var RegionContainer = Marionette.LayoutView.extend({
    el: "#app-container",

    regions: {
      navRegion: "#nav-region",
      main: "#main-region",
      dialog: "#dialog-region",
      footerRegion: "#footer-region"
    }
  });

  App.regions = new RegionContainer();
});

App.on("start", function(){
  console.log("My App has started");

  // start the backbone routing
  if (Backbone.history) {
    Backbone.history.start();
  }

  //defualt route
  if (this.getCurrentRoute() === "") {
    App.trigger("tasks:list");
  }
  

    /* if (Backbone.history) {
      require(["taskapp/TasksApp"], function(){
        Backbone.history.start();

        if (App.getCurrentRoute() === ""){
          App.trigger("tasks:list");
        }
      });
    } */
    /*var skills = new App.Skills({
      'languages': 'Java, JavaScript Python',
      'frameworks': 'J2EE, JSP, Servlets, Spring MVC, Hibernates, JAX-RS, Jersey, Django',
      'webtech': 'HTML5, Web Services(SOAP and ReST), jQuery, Ajax and BootStrap',
      'tools': 'Eclipse, Git, Maven, Chrome Dev Tools',
      'databases': 'Mysql, Mongodb, Couchdb'
    });

    var skillsView = new App.SkillsView();
    skillsView.render();
    });

    //Define the App module

    var navWidget = App.module("NavWidget", function(self, App, Backbone, Marionette, $, _){

    }); */
});  
