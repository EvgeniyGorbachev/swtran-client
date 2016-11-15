'use strict';

angular.module('inspinia')
  .controller('UserController', function ($rootScope, user, $state) {
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
          //hack, need to reload create controller 
          location.href='/user/create';
          //doesnt work
          // $state.transitionTo('index.usersCreate', {}, { reload: true, inherit: true, notify: true });
          // $state.go('index.usersCreate', {}, { reload: 'index.usersCreate' })
          // $state.go('index.usersCreate', {}, {reload: true, inherit: false});
      };

  });
