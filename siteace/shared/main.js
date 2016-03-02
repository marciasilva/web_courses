// code that is shared between client and server, i.e. sent to both

// method definitions

Meteor.methods({
// adding new comments
  addComment:function(comment){
    console.log("addComment method running!");
    comment.cretedOn = new Date();
    return Comments.insert(comment);
  }
})