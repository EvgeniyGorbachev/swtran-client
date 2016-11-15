angular
    .module('inspinia')
    .factory('user', ['storageService', 'Restangular', '$q', function(storageService, Restangular, $q) {
        return {
            login: function (object) {
                return Restangular.all('auth/login').post(object);
            },
            getPersonalData: function () {
                return Restangular.one('user', 'personal').get();
            },
            getAllUsers: function (query) {
                return Restangular.one('user').get(query);
            },
            getAllRoles: function () {
                return Restangular.one('user/roles').get();
            },
            register: function (data) {
                var baseAccounts = Restangular.all('user/register');
                return baseAccounts.post(this.prepareDataToSave(data));
            },
            checkLogin: function (data) {
                var baseAccounts = Restangular.all('user/check-login');
                return baseAccounts.post(this.prepareDataToSave(data));
            },
            generatePassword: function () {
                return Math.random().toString(36).slice(-8);
            },
            sortAllUsers: function (fieldName) {
                var query = {};
                this.sortFlag = !this.sortFlag;
                var sortDirection = (this.sortFlag)? 'sortAsc': 'sortDesc';
                query[sortDirection] = fieldName;
                
                return this.getAllUsers(query);
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

    