angular
    .module('inspinia')
    .factory('notification', ['storageService', 'Restangular', '$q', function(storageService, Restangular, $q) {
        return {
            login: function (object) {
                return Restangular.all('auth/login').post(object);
            },
            getPersonalData: function () {
                return Restangular.one('user', 'personal').get();
            },
            getAllUsers: function (query) {
                return Restangular.one('user').get(query);
            },
            getAllRoles: function () {
                return Restangular.one('user/roles').get();
            },
            register: function (data) {
                var baseAccounts = Restangular.all('user/register');
                return baseAccounts.post(data);
            },
            generatePassword: function () {
                return Math.random().toString(36).slice(-8);
            },
            sortAllUsers: function (fieldName) {
                var query = {};
                this.sortFlag = !this.sortFlag;
                var sortDirection = (this.sortFlag)? 'sortAsc': 'sortDesc';
                query[sortDirection] = fieldName;

                return this.getAllUsers(query);
            },
            current: {},
            sortFlag: true
        };
    }]);

    