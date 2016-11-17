(function() {
  'use strict';

  angular
    .module('inspinia')
    .config(function(RestangularProvider, envConfig, $provide, storageServiceProvider, $httpProvider) {
        var countRequests = 0;
        $httpProvider.interceptors.push([
            '$q', '$rootScope', 'storageService',
            function ($q, $rootScope, storageServiceProvider) {
                return {
                    request: function (config) {
                        if (countRequests++ == 0) {
                            $('.sk-spinner').show();
                            $('.loading-overlay').show();
                        }
                        if (storageServiceProvider.getBearer()) {
                            $httpProvider.defaults.headers.common[storageServiceProvider.securityHeaderName] = storageServiceProvider.getFullBearer();
                        }
                        return config;
                    },
                    response: function (response) {
                        if (--countRequests == 0) {
                            $('.sk-spinner').hide();
                            $('.loading-overlay').hide();
                        }
                        return response;
                    },
                    responseError: function (response) {

                        if (--countRequests == 0) {
                            $('.sk-spinner').hide();
                            $('.loading-overlay').hide();
                        }

                        if(response.status == 404 || response.status == 403) {
                            // $rootScope.$broadcast('app.404');
                        }

                        if(response.status == -1) {
                            // storageServiceProvider.deleteBearer();
                            // location.href = '/login';
                        }

                        toastr.error('Server error.', 'Error!');

                        return $q.reject(response);
                    }
                };
            }
        ]);
        
        RestangularProvider.setBaseUrl(envConfig.mainApiUrl);
    })    
    .run(function($rootScope, storageService, user, $state, Restangular, authorizationService) {
        //set global function
        $rootScope.logout = authorizationService.logout;
        
        if (storageService.getBearer()) {
            //in .run method we need set header again for request below, hack
            Restangular.setDefaultHeaders({Authorization: storageService.getFullBearer()});
            
            user.getPersonalData().then(function (response) {
                //set data in model
                user.current = response.data.user;
                user.permissions = response.data.user.permissions;
                
                //set data to global scope
                $rootScope.currentUser = response.data.user;

                //init global permission function
                $rootScope.isAllowed = function (permission) {
                    var foundPermission = $.grep($rootScope.currentUser.permissions, function(e){ return e.name == permission; });
                    return foundPermission.length != 0;
                };
                
            }, function (response) {
                authorizationService.logout();
            });

            user.getAllRoles().then(function (response) {
                user.roles = response.data.userRoles;
                $rootScope.userRoles = response.data.userRoles;
            });
            
        } else {
            
        }

        $rootScope.$on('$stateChangeStart', function (e, toState, toParams) {
            var requireLogin = toState.data.requireLogin;
            var curentStatePermission = toState.data.permission;
            var token = storageService.getBearer();
            
            //check for login and token
            if (requireLogin && token == null) {
                e.preventDefault();
                $state.go('login');
            } else {
                //set interval for wait ajax data (user personal)
                var intervalId = setInterval(function () {
                    if ($rootScope.currentUser != null) {
                        //stop interval if data responsed
                        clearInterval(intervalId);

                        //check for users permissions
                        if (curentStatePermission) {
                            if ( !$rootScope.isAllowed(curentStatePermission)) {
                                e.preventDefault();
                                $state.go('index.userProfile');
                            }
                        }
                    }
                }, 100);
            }
        });
  });

})();
