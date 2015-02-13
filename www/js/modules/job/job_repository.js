(function() {
	var app = angular.module('proksi');

	app.factory('JobRepository', ['$http', function ($http) {
        var urlBase = 'https://awesomeapp-alexcalingasanruby-1.c9.io/jobs';
        var repository = {};
        repository.getItems = function () {
            return $http.get(urlBase);
        };
        repository.getItem = function (id) {
            return $http.get(urlBase + '/' + id);
        };
        repository.insertItem = function (item) {
            return $http.post(urlBase, item);
        };
        repository.updateItem = function (item) {
            return $http.post(urlBase + '/' + item.Id, item);
        };
        repository.deleteItem = function (id) {
            return $http.delete(urlBase + '/' + id);
        };
        return repository;
    }]);
})();

(function() {
    var app = angular.module('proksi');

    app.factory('MessageRepository', ['$http', function ($http) {
        var urlBase = 'https://awesomeapp-alexcalingasanruby-1.c9.io/messages';
        var repository = {};
        repository.getItems = function () {
            return $http.get(urlBase);
        };
        repository.getItem = function (id) {
            return $http.get(urlBase + '/' + id);
        };
        repository.insertItem = function (item) {
            return $http.post(urlBase, item);
        };
        repository.updateItem = function (item) {
            return $http.post(urlBase + '/' + item.Id, item);
        };
        repository.deleteItem = function (id) {
            return $http.delete(urlBase + '/' + id);
        };
        return repository;
    }]);
})();


(function() {
    var app = angular.module('proksi');

    app.factory('UserMessageRepository', ['$http', function ($http) {
        var urlBase = 'https://awesomeapp-alexcalingasanruby-1.c9.io/user_messages';
        var repository = {};
        repository.getItem = function (id) {
            return $http.get(urlBase + '/' + id);
        };
        return repository;
    }]);
})();

(function() {
    var app = angular.module('proksi');

    app.factory('facebookRepository', ['$http', function ($http) {
        var urlBase = 'http://graph.facebook.com/';
        var repository = {};
        repository.getProfile = function (fbId) {
            return $http.get(urlBase + fbId);
        };
        repository.getImage = function (fbId) {
            return urlBase + fbId + '/picture?type=square';
        };
        return repository;
    }]);

    
})();