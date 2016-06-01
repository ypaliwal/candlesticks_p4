(function(){
	'use strict';

	angular
		.module('myApp', ['ui.router']);

	angular
		.module('myApp')
		.config(function($stateProvider, $httpProvider, $urlRouterProvider){
			$urlRouterProvider.otherwise('/');

			$stateProvider
			.state('landing', {
				url: '/',
				templateUrl: 'site/partials/landing.html',
				controller: 'LandingCtrl as ctrl'
			})
			.state('portfolio', {
				url: '/portfolio',
				templateUrl: 'site/partials/portfolio.html',
				controller: 'PortfolioCtrl as ctrl'
			})
			.state('myPortfolio', {
				url: '/myPortfolio',
				templateUrl: 'site/partials/myPortfolio.html',
				controller: 'MyPortfolioCtrl as ctrl'
			});			
		});

})();