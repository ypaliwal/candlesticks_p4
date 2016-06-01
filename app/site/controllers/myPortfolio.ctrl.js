(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('MyPortfolioCtrl', MyPortfolioCtrl);

	function MyPortfolioCtrl($state, $http) {	
		var myportVm = this;

		// Public fuctions
		myportVm.addStock = addStock;

		// Save the userName and userID for use by Ctrl
		myportVm.userName = localStorage.getItem("userName");
		myportVm.userID = localStorage.getItem("user_id");

		// Testing text and console logs
		myportVm.testingText = 'MyPortfolioCtrl loaded!';
		console.log(myportVm.testingText);

		// Grab the current userStockArr
		var req = {
			method: 'GET',
			url: 'users/get/' + myportVm.userID,
		}
		$http(req)
		.then(
			function(res) {
				console.log(res);
				myportVm.userStockArr = res.data.stockArr;
				console.log(myportVm.userStockArr);
				if(res.data.stockArr == "") {
					console.log('The StockArr is empty');
				}
			}, function(err) { console.log(err) }
		)



		function addStock() {
			// 1. Grab data from form
			// 2. http request to post stock
			// 3. update the userStockArr
				// by taking the current userStockArr, and appending a space and the _id of the stock entry you just added

			var req = {
				method: 'POST',
				url: 'newStock',
				data: { ticker: myportVm.addTicker, purchasePrice: myportVm.addPurchasePrice, quantity: myportVm.addQuantity }
			}
			$http(req)
			.then(
				function(res){
					console.log(res.data._id);
					addStockHelper(res.data._id);
				},
				function(err){ console.log(err) }
			);
		}
		function addStockHelper(addedStockID) {
			if (myportVm.userStockArr == "") {
				var newUserStockArr = addedStockID;	
			} else {
				var newUserStockArr = newUserStockArr + ' ' + addedStockID;
			}

			myportVm.putData = {
				stockArr: newUserStockArr
			}
			$http.put('users/updateStockArr/' + myportVm.userID, myportVm.putData)
			.then(function (res) {
				console.log(res);
				$state.reload();
			}, function (err) {
				console.log(err);
			});

		}
		

	}
})();