angular
    .module('inspinia')
    .factory('user', ['storageService', 'Restangular', '$q', 'envConfig', function(storageService, Restangular, $q, envConfig) {
        return {
            login: function (object) {
                return Restangular.all('auth/login').post(object);
            },
            getPersonalData: function () {
                return Restangular.one('user/info/personal').get();
            },
            getAllUsers: function (query) {
                return Restangular.one('user').get(query);
            },
            getAllRoles: function () {
                return Restangular.one('user/info/roles').get();
            },
            get: function (id) {
                return Restangular.one('user/' + id).get();
            },
            save: function (data) {
                return Restangular.all('user').customPUT(this.prepareDataToSave(data));
            },
            delete: function (id) {
                return Restangular.one('user', id).remove();
            },
            register: function (data) {
                return Restangular.all('user').post(this.prepareDataToSave(data));
            },
            checkLogin: function (data) {
                return Restangular.all('user/check-login').post(this.prepareDataToSave(data));
            },
            generatePassword: function () {
                return Math.random().toString(36).slice(-8);
            },
            getTemplate: function () {
                return angular.copy(this.objectTemplate);
            },
            setSortField: function (fieldName) {
                this.sortFlag = !this.sortFlag;
                return (this.sortFlag)? fieldName: '-' + fieldName;
            },
            prepareDataToSave: function (data) {
                var dataToSend = angular.copy(data);
                
                //boolean to integer
                dataToSend.working_status = (dataToSend.working_status) ? 1: 0;

                //string to integer
                dataToSend.role_id        = parseInt(dataToSend.role_id, 10);
                dataToSend.mobile_phone   = parseInt(dataToSend.mobile_phone, 10);
                dataToSend.working_status = parseInt(dataToSend.working_status, 10);
                dataToSend.password       = dataToSend.password;
                dataToSend.personal_id    = parseInt(dataToSend.personal_id, 10);

                //set timestamp
                dataToSend.dl_exp_date = moment(dataToSend.dl_exp_date).unix();
                dataToSend.mc_exp_date = moment(dataToSend.mc_exp_date).unix();
                dataToSend.hire_date   = moment(dataToSend.hire_date).unix();
                dataToSend.term_date   = moment(dataToSend.term_date).unix();
                
                return dataToSend;
            },
            prepareDataToView: function (data) {
                var dataToView = angular.copy(data);
                //set date
                dataToView.dl_exp_date = (dataToView.dl_exp_date != 0) ? moment.unix(dataToView.dl_exp_date).format(envConfig.userDatepickerDateFormatForMoment): null;
                dataToView.mc_exp_date = (dataToView.mc_exp_date != 0) ? moment.unix(dataToView.mc_exp_date).format(envConfig.userDatepickerDateFormatForMoment): null;
                dataToView.hire_date   = (dataToView.hire_date != 0) ? moment.unix(dataToView.hire_date).format(envConfig.userDatepickerDateFormatForMoment): null;
                dataToView.term_date   = (dataToView.term_date != 0) ? moment.unix(dataToView.term_date).format(envConfig.userDatepickerDateFormatForMoment): null;
                
                return dataToView;
            },
            current: {},
            uploadUrl: '/user/upload',
            roles: {},
            sortFlag: true,
            objectTemplate: {
                name: null,
                surname: null,
                role_id: null,
                nick_name: null,
                personal_id: null,
                email: null,
                mobile_phone: null,
                address: null,
                working_status: null,
                cdl_experience: null,
                doubles_experience: null,
                term_reason: null,
                veteran: null,
                password: null,
                dl_exp_date: null,
                mc_exp_date: null,
                hire_date: null,
                term_date: null
            }
        };
    }]);

    