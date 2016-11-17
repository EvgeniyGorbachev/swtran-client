'use strict';

angular.module('inspinia')
    .directive('deleteUser', function (user, $uibModal) {
        return {
            restrict: 'E',
            transclude: true,
            scope: true,
            templateUrl: 'app/directives/delete-user/template.html',
            link: function (scope, $element, $attr) {
                $element.bind('click', function() {
                    var modalInstance = $uibModal.open({
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'app/directives/delete-user/modal-template.html',
                        controller: 'ModalUserDeleteController',
                        controllerAs: 'modalUserDelete',
                        size: 'sm',
                        resolve: {
                            userId: function () {
                                return $attr.userId;
                            }
                        }
                    });
                });
            }
        };
    });