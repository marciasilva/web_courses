angular.module('NoteWrangler')
.factory('Note', [function NoteFactory($http) {
  return {
    all : function(){
      $http({
        method : 'GET',
        url : '/notes'
      });
    }
  };
}]);
