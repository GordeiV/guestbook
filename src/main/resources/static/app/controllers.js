(function (angular) {
    var MessageController = function ($scope, Message) {

        Message.query(function (response) {
            $scope.messages = response ? response : [];
        });

        $scope.saveMessage = function (username, messageText) {
            if(username.length > 20) {
                $scope.incorrectInput = "The username should not contain more than 20 characters."
                return;
            }

            new Message({
                username: username,
                text: messageText,
                postedDate: new Date()
            }).$add(function (result) {
                $scope.messages.unshift(result);
            });

            $scope.clearFields();
        };

        $scope.deleteMessage = function (messageId) {
            messageId.$remove(function () {
                $scope.messages = Message.query();
            });
        };

        $scope.clearFields = function () {
            $scope.guestUsername = "";
            $scope.messageText = "";
            $scope.incorrectInput = "";
        }
    };
    MessageController.$inject = ['$scope', 'Message'];
    angular.module("guestbook.controllers").controller("MessageController", MessageController);

}(angular));