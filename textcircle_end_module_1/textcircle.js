this.Documents = new Mongo.Collection("documents");

//variable with global scope
//      Session.set("current_date", new Date());
//
//      //To automatically update the variable after 2 seconds
//      Meteor.setInterval(function () {
//        // body...
//          Session.set("current_date", new Date());
//      }, 2000);
//
//      //Create the helper for the template definied no html
//      Template.date_display.helpers({
//        "current_date" : function(){
//          return Session.get("current_date");
//        },
//
//        //myVar variable from date_display template scope
//        myVar:function () {
//          // body...
//          return myVar;
//        }
//      });

if(Meteor.isClient){
  Template.editor.helpers({
    docid:function(){
      var doc = Documents.findOne();
      console.log(Meteor);
      if (doc){
        return doc._id;
      }
      else {
        return undefined;
      }
    }, 
    // template helper that configures the CodeMirror editor
    // you might also want to experiment with the ACE editor
    config:function(){
      return function(editor){
        editor.setOption("mode", "html");
        editor.on("change", function(cm_editor, info){
          //console.log(cm_editor.getValue());
          $("#viewer_iframe").contents().find("html").html(cm_editor.getValue());
        });        
      }
    }, 
  });
}

//this code run everytime the app is started
if (Meteor.isServer) {
  Meteor.startup(function () {
    // startup code that creates a document in case there isn't one yet. 
    if (!Documents.findOne()){// no documents yet!
        Documents.insert({title:"my new document"});
    }
  });
}
