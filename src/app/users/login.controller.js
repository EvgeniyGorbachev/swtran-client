'use strict';

angular.module('inspinia')
    .controller('LoginController', function ($state, $rootScope, Restangular, storageService, authorizationService) {
        var vm = this;
        vm.loginErrorLog = {};
        $rootScope.isGrayBody = true;

        vm.login = function () {
            if (!vm.form.$valid) {
                return false;
            } else {
                authorizationService.login(vm.identifier, vm.password).then(function (error) {
                    if (error.email) {
                        vm.loginErrorLog['identifier'] = error.personal_id[0];
                    }
                    if (error.password) {
                        vm.loginErrorLog['password'] = error.password[0];
                    }
                    if (error.message) {
                        vm.loginErrorLog['message'] = error.message[0];
                    }
                });
            }
        }
    });
