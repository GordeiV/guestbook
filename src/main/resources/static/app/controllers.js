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



        // $scope.incorrectInput = "";
        // $scope.addRandomNumber = function (nickname, numberFrom, numberTo) {
        //     if(numberFrom >= numberTo) {
        //         $scope.incorrectInput = "Проверьте введенное число";
        //         return;
        //     }
        //     var value = $scope.getRandomNumber(numberFrom, numberTo);
        //     alert("Вау, супер, ты просто счастивчик! Держи число " + value);
        //     new Message({
        //         nickname: $scope.validation(nickname) ? nickname : "Ну чего ты ник не написал(",
        //         value: value,
        //         createDate: new Date()
        //     }).$add(function (result) {
        //         $scope.randomNumbers.unshift(result);
        //         if($scope.randomNumbers.length > 5)
        //             $scope.randomNumbers.pop();
        //     });
        //     $scope.clearModels();
        // };
        //
        // $scope.updateRandomNumber = function(randomNumber, newNickname) {
        //     new Message({
        //         id: randomNumber.id,
        //         value: randomNumber.value,
        //         createDate: randomNumber.createDate,
        //         nickname: $scope.validation(newNickname) ? newNickname : randomNumber.nickname
        //     }).$update(function () {
        //         $scope.randomNumbers = Message.query();
        //     });
        // };
        //
        // $scope.deleteRandomNumber = function(randomNumber) {
        //     randomNumber.$remove(function () {
        //         $scope.randomNumbers = Message.query();
        //     });
        // };
        //
        // $scope.getRandomNumber = function (numberFrom, numberTo) {
        //     numberFrom = Math.ceil(numberFrom);
        //     numberTo = Math.floor(numberTo);
        //     return Math.floor(Math.random() * (numberTo - numberFrom + 1)) + numberFrom;
        // };
        //
        // $scope.validation = function (param) {
        //     return !(typeof param === "undefined" || param === null || param === "");
        // };
        //
        // $scope.clearModels = function () {
        //     $scope.nickname = "";
        //     $scope.numberFrom = "";
        //     $scope.numberTo = "";
        //     $scope.incorrectInput = "";
        // };

    };
    MessageController.$inject = ['$scope', 'Message'];
    angular.module("guestbook.controllers").controller("MessageController", MessageController);

}(angular));