Tasks = new Mongo.Collection('tasks');

if (Meteor.isClient) {

    // Configure accounts UI to use usernames instead of email
    Accounts.ui.config({
      passwordSignupFields: "USERNAME_ONLY"
    });

   // This code only runs on the client
   //accounts-ui package to password authentication
  angular.module('simple-todos',['angular-meteor', 'accounts.ui']);

  function onReady(){
    angular.bootstrap(document, ['simple-todos']);
  }
 
  angular.module('simple-todos').controller('TodosListCtrl', ['$scope', '$meteor',
    function ($scope, $meteor) {
    
      $scope.tasks = $meteor.collection(function(){
        /*To make Meteor understand Angular bindings and the other
         way around, we use $scope.getReactively function that turns
          Angular scope variables into Meteor reactive variables.*/
          return Tasks.find($scope.getReactively('query'), {sort: {createdAt: -1}})

        //return Tasks.find($scope.query, {sort : {createdAt : -1}}) 
       // return Tasks.find({}, {sort : {createdAt: -1}})
      });


      //without insucure package we need to use the methods defined to run on client side 
      //the package allows us to edit the database from the client
      /*
      old method - with insecure package
      $scope.addTask = function (newTask) {
        $scope.tasks.push( {
          text: newTask,
          createdAt: new Date(),
          owner: Meteor.userId(),
          username: Meteor.user().username }
        );
      };
      */

      $scope.addTask = function(newTask){
        $meteor.call('addTask', newTask);
      };

      $scope.deleteTask = function(task){
        $meteor.call('deleteTask', task._id);
      };

      $scope.setChecked = function(task){
        $meteor.call('setChecked', task._id, !task.checked);
      };


      $scope.$watch('hideCompleted', function() {
        if ($scope.hideCompleted)
          $scope.query = {checked: {$ne: true}};
        else
          $scope.query = {};
      });

      $scope.incompleteCount = function () {
        return Tasks.find({ checked: {$ne: true} }).count();
      };
  }]);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

//Add Meteor Methods for add, delete and check tasks
Meteor.methods({
  addTask: function (text) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteTask: function (taskId) {
    Tasks.remove(taskId);
  },
  setChecked: function (taskId, setChecked) {
    Tasks.update(taskId, { $set: { checked: setChecked} });
  }
});