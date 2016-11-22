'use strict';

angular.module('inspinia')
  .controller('UserController', function ($rootScope, user, $state, $window, $uibModal, $scope) {
    var vm = this;
      vm.members = null;
      vm.complexFieldForSearch = null;
      vm.filters = {
          role_id: null,
          sort: null,
          personal_id: null,
          name: null
      };

      vm.sortDirection = true;
      vm.currentDeletedUserId = null;

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
          vm.filters.sort = user.setSortField(fieldName);
          vm.filter();
      };
      
      vm.filter = function () {
          user.getAllUsers(vm.filters).then(function (response) {
              vm.members = response.data.users;
          });
      };

      vm.watchComplexfield = function (){
          //when user delete all data from input
          if (!vm.complexFieldForSearch) {
              vm.filters.name = null;
              vm.filters.personal_id = null;
              //reload data through 2 sec.
              setTimeout(function() {
                  vm.filter();
              }, 2000);
          }

          //set search param for request
          if (vm.complexFieldForSearch != null) {
              if (vm.isNumeric(vm.complexFieldForSearch)) {
                  vm.filters.name = null;
                  vm.filters.personal_id = vm.complexFieldForSearch;
              } else {
                  vm.filters.name = vm.complexFieldForSearch;
                  vm.filters.personal_id = null;
              }
          }
      };

      vm.isNumeric = function (num){
          return !isNaN(num)
      };
  });
