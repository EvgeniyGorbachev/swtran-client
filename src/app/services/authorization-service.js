angular
    .module('inspinia')
    .factory('authorizationService', ['storageService', 'Restangular', 'user', '$q', '$rootScope', '$state', function(storageService, Restangular, user, $q, $rootScope, $state) {
        return {
            login: function (id, password) {
                var deferred = $q.defer();
                user.login({personal_id: id, password: password}).then(function (response) {
                    storageService.setBearer(response.data.token);
                    user.current = response.data.user;
                    this.isLogged = true;
                    location.href = '/users';
                }, function (response) {
                    deferred.resolve(response.data.errors);
                });
                return deferred.promise;
            },
            isLogged: false,
            logout: function () {
                storageService.deleteBearer();
                this.isLogged = false;
                location.href = '/login';
            },
            isBearerSet: function () {
                var token = storageService.getBearer();
                return (typeof token == 'string' && token.length > 0);
            }
        };
    }]);

