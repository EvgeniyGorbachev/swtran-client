'use strict';

angular.module('inspinia')
    .controller('CreateController', function ($rootScope, user, $stateParams) {
        var vm = this;

        vm.userId = $stateParams.id || null;
        vm.step = 1;
        vm.registeredUser = null;
        vm.userData = user.getTemplate();
        
        user.getAllRoles().then(function (response) {
            var roles = response.data.userRoles;
            //delete admin and manager role not for the admin
            if ($rootScope.currentUser && $rootScope.currentUser.role_id != 1) {
                roles.splice(0, 2);
            }
            vm.userRoles = roles;
        }); 
        
        if (vm.userId) {
            user.get(vm.userId).then(function (response) {
                vm.userData = user.prepareDataToView(response.data.user);
            });
        }

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
        
        vm.editUser = function () {
            vm.form.personal_id.$error.uniqueLogin = true;
            if (!vm.form.$valid) {
                return false;
            }
            user.save(vm.userData).then(function (response) {
                toastr.success('User data saved.', 'Successfully!');
            },function (response) {
                toastr.error('Error', 'Error!');
            });
        };
        
        vm.setPassword = function () {
            if (vm.userId) return false;
            vm.userData.password = (vm.userData.role_id == 4)? vm.userData.personal_id: user.generatePassword();
        };
        
        vm.isEditState = function () {
            return Boolean(vm.userId);
        };
    });
