(function (angular) {
    var MessageFactory = function ($resource) {
        return $resource('message/:action/:id',
            {id: "@id"},
            {
                add: {
                    method: "POST",
                    params: {
                        action: 'saveMessage'
                    }
                },
                remove: {
                    method: "DELETE",
                    params: {
                        action: 'deleteMessage'
                    }
                }
            });
    };
    MessageFactory.$inject = ['$resource'];
    angular.module("guestbook.services").factory("Message", MessageFactory);
}(angular));