// documents collection
this.Documents = new Mongo.Collection("documents");
// editing users collection
EditingUsers = new Mongo.Collection("editingUsers");

if (Meteor.isClient) {
  // subscriptions - allow read access to collections 
  Meteor.subscribe("documents");
  Meteor.subscribe("editingUsers");
  
  Template.editor.helpers({
    // return the id of the currently loaded doc
    docid:function(){
      setupCurrentDocument();
      return Session.get("docid");
    }, 
    // configure the CodeMirror editor
    config:function(){
      return function(editor){
        editor.setOption("lineNumbers", true);
        editor.setOption("theme", "cobalt");
          // respond to edits in the code editor window
        editor.on("change", function(cm_editor, info){
          $("#viewer_iframe").contents().find("html").html(cm_editor.getValue());
          Meteor.call("addEditingUser");
        });        
      }
    }, 
  });

  Template.editingUsers.helpers({
    // return users editing current document
    users:function(){
      var doc, eusers, users;
      doc = Documents.findOne();
      if (!doc){return;}// give up
      eusers = EditingUsers.findOne({docid:doc._id});
      if (!eusers){return;}// give up
      users = new Array();
      var i = 0;
      for (var user_id in eusers.users){
          users[i] = fixObjectKeys(eusers.users[user_id]);
          i++;
      }
      return users;
    }
  })

  Template.navbar.helpers({
    // return a list of all visible documents
    documents:function(){
      //return Documents.find({isPrivate: false}); -- it is a problem on the console you can see the private documents
      return Documents.find();
    }
  })

  Template.docMeta.helpers({
    // return current document 
    document:function(){
      return Documents.findOne({_id:Session.get("docid")});
    }, 
    // return true if I am allowed to edit the current doc, false otherwise
    canEdit:function(){
      var doc;
      doc = Documents.findOne({_id:Session.get("docid")});
      if (doc){
        //if (doc.owner == Meteor.userId()){ 
        if(doc.owner == Meteor.user()._id){
          return true;
        }
      }
      return false;
    }
  })

  Template.editableText.helpers({
    // return true if I am allowed to edit the current doc, false otherwise
    userCanEdit : function(doc,Collection) {
      // can edit if the current doc is owned by me.
      doc = Documents.findOne({_id:Session.get("docid"), owner:Meteor.userId()});
      if (doc){
        return true;
      }
      else {
        return false;
      }
    }    
  })

  ////////route
  /// EVENTS
  ////////

  Template.navbar.events({
    // add a new document button
    "click .js-add-doc":function(event){
      event.preventDefault();
      console.log("Add a new doc!");
      if (!Meteor.user()){// user not available (checked in client side)
          alert("You need to login first!");
      }
      else {
        // they are logged in... lets insert a doc
        //the method runs on the background (assync) so we have a callback function to get the result from the method
        //the data context is the data that the template has access to directly.
        var id = Meteor.call("addDoc", function(err, res){
          if (!err){// all good
            console.log("event callback received id: "+res);
            Session.set("docid", res);            
          }
        });
      }
    }, 
    // load a document link
    "click .js-load-doc":function(event){
      //console.log(this); get the id from the document you clicked and update the session which trigger the reactive meteor 
      //and the editor is rendered again 
      Session.set("docid", this._id);
    }
  })

  Template.docMeta.events({
    // toggle the private checkbox
    "click .js-tog-private":function(event){
      console.log(event.target.checked);
      //create an object with the document id and with isprivate status
      var doc = {_id:Session.get("docid"), isPrivate:event.target.checked};
      Meteor.call("updateDocPrivacy", doc);

    }
  })


}// end isClient...

if (Meteor.isServer) {
  Meteor.startup(function () {
    // create a starter doc
    if (!Documents.findOne()){// no documents yet!
        Documents.insert({title:"my new document"});
    }
  });

  //it is necessary publish when you are using subscribe
  // publish a list of documents the user can se
  //it can only see documents that the publish function return
  Meteor.publish("documents", function(){
    return Documents.find({
      //or filter.. you can see public documents, or if the userId is the owner
     $or:[
      {isPrivate:false}, 
      {owner:this.userId}
      ] 
    });
  })  
  // public sets of editing users
  Meteor.publish("editingUsers", function(){
    return EditingUsers.find();
  })

}

Meteor.methods({
  // method to add a new document
  addDoc:function(){
    var doc;
    if (!this.userId){// not logged in
      return;
    }
    else {
      doc = {owner:this.userId, createdOn:new Date(), 
            title:"my new doc"};
      var id = Documents.insert(doc);
      console.log("addDoc method: got an id "+id);
      return id;
    }
  }, 
  // method to change privacy flag on a docuement
  updateDocPrivacy:function(doc){
    console.log("updateDocPrivacy method");
    console.log(doc);
    var realDoc = Documents.findOne({_id:doc._id, owner:this.userId});
    if (realDoc){
      realDoc.isPrivate = doc.isPrivate;
      Documents.update({_id:doc._id}, realDoc);
    }

  },
  // method to add editing suers to a document
  addEditingUser:function(){
    var doc, user, eusers;
    doc = Documents.findOne();
    if (!doc){return;}// no doc give up
    if (!this.userId){return;}// no logged in user give up
    // now I have a doc and possibly a user
    user = Meteor.user().profile;
    eusers = EditingUsers.findOne({docid:doc._id});
    if (!eusers){
      eusers = {
        docid:doc._id, 
        users:{}, 
      };
    }
    user.lastEdit = new Date();
    eusers.users[this.userId] = user;

    EditingUsers.upsert({_id:eusers._id}, eusers);
  }
})

/******************* functions *****************/
// handy function that makes sure we have a document to work on
function setupCurrentDocument(){
  var doc;
  if (!Session.get("docid")){// no doc id set yet
    doc = Documents.findOne(); // get a random document
    if (doc){
      Session.set("docid", doc._id);
    }
  }
}
// function to change object keys by removing hyphens to make them 
// compatible with space bars. 
function fixObjectKeys(obj){
  var newObj = {};
  for (key in obj){
    var key2 = key.replace("-", "");
    newObj[key2] = obj[key];
  }
  return newObj;
}