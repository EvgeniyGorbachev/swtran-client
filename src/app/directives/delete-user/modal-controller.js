'use strict';

angular.module('inspinia')
    .controller('ModalUserDeleteController', function ($rootScope, user, userId, $state, $uibModalInstance) {
        var vm = this;
        vm.delete = function () {
                user.delete(userId).then(function (response) {
                    $uibModalInstance.close();
                    toastr.success('User has deleted.', 'Successfully!');
                    $state.reload();
                });
            };
    });
