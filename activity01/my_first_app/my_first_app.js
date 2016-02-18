//running in a web browser
if (Meteor.isClient) {
  Template.time.helpers({
  	"date" : function () {
  		return new Date();
  	}
  });
}

//running in a server
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
