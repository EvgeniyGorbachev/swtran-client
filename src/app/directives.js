'use strict';

//Directive used to set metisMenu and minimalize button
angular.module('inspinia')
    .directive('sideNavigation', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                // Call metsi to build when user signup
                scope.$watch('authentication.user', function() {
                    $timeout(function() {
                        element.metisMenu();
                    });
                });

            }
        };
    })
    .directive('minimalizaSidebar', function ($timeout) {
        return {
            restrict: 'A',
            template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
            controller: function ($scope) {
                $scope.minimalize = function () {
                    angular.element('body').toggleClass('mini-navbar');
                    if (!angular.element('body').hasClass('mini-navbar') || angular.element('body').hasClass('body-small')) {
                        // Hide menu in order to smoothly turn on when maximize menu
                        angular.element('#side-menu').hide();
                        // For smoothly turn on menu
                        $timeout(function () {
                            angular.element('#side-menu').fadeIn(400);
                        }, 200);
                    } else {
                        // Remove all inline style from jquery fadeIn function to reset menu state
                        angular.element('#side-menu').removeAttr('style');
                    }
                };
            }
        };
    })
    .directive('datepickerInput',  function ($timeout) {
        return {
            require: 'ngModel',
            scope: {
                date: '=ngModel'
            },
            link: function (scope, element, attrs, ngModel) {
                var dataPickerElement = $(element);

                //off user typing
                dataPickerElement.keypress(function(event) {event.preventDefault();});

                //set datepicker
                dataPickerElement.datepicker({
                    // format: envConfig.userDatepickerDateFormat,
                    todayBtn: "linked",
                    orientation: "bottom left",
                    keyboardNavigation: false,
                    forceParse: false,
                    calendarWeeks: true,
                    autoclose: true
                });

                //set current day
                dataPickerElement.datepicker('setDate', scope.date);
            }
        }
    })
    .directive('checkboxSwitch', function () {
        return {
            require: 'ngModel',
            scope: {
                date: '=ngModel'
            },
            link: function (scope, element, attrs, ngModel) {
                scope.date = true;
                var elem = document.querySelector('.js-switch');
                var switchery = new Switchery(elem, { color: '#1AB394' });

                elem.onchange = function() {
                    scope.date = elem.checked;
                };
            }
        }
    })
    .directive('limitMaxLength', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                var maxlength = Number(attrs.limitMaxLength);
                function fromUser(text) {
                    if (text.length > maxlength) {
                        var transformedInput = text.substring(0, maxlength);
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                        return transformedInput;
                    }
                    return text;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    })
    .directive('limitByPattern', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                //patern must be in format - "^[0-9]+$"  - without '/'
                var pattern = new RegExp(attrs.limitByPattern);
                function fromUser(text) {
                    if (!pattern.test(text)) {
                        var transformedInput = text.substring(0, text.length - 1);
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                        return transformedInput;
                    }
                    return text;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    })
    .directive('uniqueLogin', function (user) {
        var toId;
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elem, attr, ctrl) {
                //when the scope changes, check the login.
                scope.$watch(attr.ngModel, function(value) {
                    // if there was a previous attempt, stop it.
                    if(toId) clearTimeout(toId);

                    // start a new attempt with a delay to keep it from
                    // getting too "chatty".
                    toId = setTimeout(function(){

                        return  user.checkLogin({login: value}).then(function (response) {
                            //set the validity of the field
                            ctrl.$setValidity('uniqueLogin', response.data.isUnique);
                        });

                    }, 200);
                })
            }
        }
    });


