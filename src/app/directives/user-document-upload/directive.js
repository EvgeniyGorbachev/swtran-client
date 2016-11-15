'use strict';

//Usage - <user-document-upload user-id="22" file-type="fgfgfgfgfgfg">Driver's license obverse</user-document-upload>
angular.module('inspinia')
    .directive('userDocumentUpload', function ($timeout, Upload, envConfig, user) {
        return {
            restrict: 'E',
            transclude: true,
            scope: true,
            templateUrl: 'app/directives/user-document-upload/template.html',
            link: function (scope, element, attrs) {
                scope.uploadFiles = function(file, errFiles) {
                    var userId = attrs.userId;
                    var fileType = attrs.fileType;
                    
                    scope.f = file;
                    scope.errFile = errFiles && errFiles[0];
                    if (file) {
                        file.upload = Upload.upload({
                            url: envConfig.mainApiUrl + user.uploadUrl,
                            data: {
                                file: file,
                                user_id: userId,
                                file_type: fileType
                            }
                        });

                        file.upload.then(function (response) {
                            var fileName = response.data.full_file_name;
                            toastr.success('The image was successfully saved.', 'Successfully!');
                        }, function (response) {
                            toastr.error('Upload an image failed.', 'Error!');
                        }, function (evt) {
                            // scope.f.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                        });
                    }
                }
            }
        };
    });