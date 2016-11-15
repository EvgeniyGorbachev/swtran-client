'use strict';

angular.module('inspinia')
  .controller('UserController', function ($rootScope, user) {
    var vm = this;
      vm.members = {};
      vm.sortDirection = true;

      if (!$rootScope.userRoles) {
          user.getAllRoles().then(function (response) {
              vm.userRoles = response.data.userRoles;
          });
      } else {
          vm.userRoles = $rootScope.userRoles;
      }
      
      user.getAllUsers({}).then(function (response) {
          vm.members = response.data.users;
      });

      vm.sortBy = function (fieldName) {
          user.sortAllUsers(fieldName).then(function (response) {
              vm.members = response.data.users;
          });
      };

      vm.createUser = function () {
          //hack, need to reload create controller $state.go('index.usersCreate', {}, {reload: true}) - doesnt work
          location.href='/user/create';
      };

  });
