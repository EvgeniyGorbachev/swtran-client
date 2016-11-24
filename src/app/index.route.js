(function() {
  'use strict';

  angular
    .module('inspinia')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider

      .state('index', {
        abstract: true,
        templateUrl: "app/components/common/content.html"
      })
      .state('404', {
        url: "/404",
        templateUrl: "app/components/common/404.html",
        controller: 'CommonController',
        data: {
          pageTitle: '404',
          permission: null,
          requireLogin: false
        }
      })
      .state('login', {
        url: "/login",
        templateUrl: "app/users/templates/login.html",
        controller: 'LoginController',
        controllerAs: 'user',
        data: {
          pageTitle: 'Login', 
          permission: null,
          requireLogin: false
        }
      })
      .state('index.users', {
        url: "/users",
        templateUrl: "app/users/templates/list.html",
        controller: 'UserController',
        controllerAs: 'usersList',
        data: {
            pageTitle: 'Users',
            permission: 'view-user-list',
            requireLogin: true
        }
      })
      .state('index.usersCreate', {
        url: "/user/create",
        templateUrl: "app/users/templates/create.html",
        controller: 'CreateController',
        controllerAs: 'userCreate',
        data: {
            pageTitle: 'Create user',
            permission: 'create-user',
            requireLogin: true
        }
      })
      .state('index.usersEdit', {
        url: "/user/edit/:id",
        templateUrl: "app/users/templates/create.html",
        controller: 'CreateController',
        controllerAs: 'userCreate',
        data: {
            pageTitle: 'Edit user',
            permission: 'edit-user',
            requireLogin: true
        }
      })
      .state('index.userProfile', {
        url: "/user/profile",
        templateUrl: "app/users/templates/profile.html",
        data: { pageTitle: 'Profile' }
      });
 
    $urlRouterProvider.otherwise('/users');
    $locationProvider.html5Mode(true);
  }

})();
