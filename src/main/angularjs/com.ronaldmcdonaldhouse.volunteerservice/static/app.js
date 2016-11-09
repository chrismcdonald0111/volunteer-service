/**
 * volunteerService 1.0.0
 */
var volunteerService = angular.module('volunteerService', ['ui.router', 'ui.calendar', 'ui.bootstrap']);

volunteerService.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state("home", {
            url: "/home",
            views: {
                "": {
                    templateUrl: "view/home.html",
                    controller: "HomeController",
                    data: {
                        css: 'css/home.css'
                    }
                }
            }
        })
        .state("calendar", {
            url: "/calendar",
            views: {
                "": {
                    templateUrl: "view/calendar.html",
                    controller: "CalendarController",
                    data: {
                        css: 'styles/calendar.css'
                    }
                }
            }
        });
}]);