'use strict';

angular.module('inspinia')
    .controller('CreateController', function ($rootScope, user, $state) {
        var vm = this;
        vm.step = 1;
        vm.userData = user.objectTemplate;
        vm.registeredUser = null;
        user.getAllRoles().then(function (response) {
            var roles = response.data.userRoles;
            //delete admin and manager role not for the admin
            if ($rootScope.currentUser && $rootScope.currentUser.role_id != 1) {
                roles.splice(0, 2);
            }
            vm.userRoles = roles;
        });

        vm.saveUser = function () {

            if (!vm.form.$valid) {
                return false;
            }
            
            user.register(vm.userData).then(function (response) {
                vm.registeredUser = response.data.user;
                vm.step = 2;
                toastr.success('New user created.', 'Successfully!');
            },function (response) {
                if (response.data.errors && response.data.errors.personal_id) {
                    toastr.error('The Fedex ID has already been taken or field is a necessary.', 'Error!');
                }
            });
        };
        
        vm.setPassword = function () {
            vm.userData.password = (vm.userData.role_id == 4)? vm.userData.personal_id: user.generatePassword();
        };
    });
