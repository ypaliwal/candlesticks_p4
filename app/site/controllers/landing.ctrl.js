(function() {
	'use strict';

	angular
		.module('myApp')
		.controller('LandingCtrl', LandingCtrl);

	function LandingCtrl($http, $state) {
		var landingVm = this;

		// Public functions
		

		// Public variables
		landingVm.signup = signup;
		landingVm.loginCheck = loginCheck;


		function signup() {
			var formComplete1 = !(landingVm.signupName == undefined);
			var formComplete2 = !(landingVm.signupEmail == undefined);
			var formComplete3 = !(landingVm.signupPassword == undefined);

			if (formComplete1 && formComplete2 && formComplete3) {
				landingVm.hashedPasswordSignup = hashCode(landingVm.signupPassword);

				var req = {
					method: 'POST',
					url: 'users/newUser',
					data: { name: landingVm.signupName, email: landingVm.signupEmail, passwordHash: landingVm.hashedPasswordSignup }
				}

				$http(req)
				.then(
					function(res){
						console.log(res);
						$state.reload();
					},
					function(err){console.log(err)}
				);
			} else {
				 alert ("SIGNUP FORM: Please fill all the required fields.");
			}
		}

		function loginCheck() {
			// check if the specified data is stored in the DB-Users
			// If so, set the LS items as "logged in", "user's name" and "array of stocks"

			landingVm.hashedPasswordLogin = hashCode(landingVm.loginPassword);

			var req = {
				method: 'POST',
				url: 'users/loginCheck',
				data: { email: landingVm.loginEmail, passwordHash: landingVm.hashedPasswordLogin }
			}
			$http(req)
			.then(
				function(res){
					console.log(res.data);

					// capture: USER-DB's _id, name, stockArr
					localStorage.setItem("userName", res.data.name);
					localStorage.setItem("user_id", res.data._id);
					// localStorage.setItem("userStockArr", res.data.stockArr);

					$state.go('myPortfolio');
				}, 
				function(err) { console.log(err) }
			)
		}


		// Function to create hash code for passwords
		function hashCode(val){
			var hash = 0;
			if (val.length == 0) return hash;
			for (var i = 0; i < val.length; i++) {
				var char = val.charCodeAt(i);
				hash = ((hash<<5) - hash) + char;
				hash = hash & hash; // Convert to 32bit integer
			}
			return hash;
		}


	}

	
})();

