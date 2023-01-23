(function(angular) {
    angular.module("guestbook.controllers", []);
    angular.module("guestbook.services", []);
    angular.module("guestbook", ["ngResource", "guestbook.controllers", "guestbook.services"]);
}(angular));