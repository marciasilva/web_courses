//wrapping your javascript in a closure is a good habit
(function (){
	var gem = { name: 'Azurite', price: 2.95 };

	var app = angular.module("gemStore",[]);

	app.controller('StoreController',function(){
		this.product = gem;
		
	}); //end controler store controller
})();
