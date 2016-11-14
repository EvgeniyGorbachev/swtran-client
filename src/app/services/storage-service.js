angular
    .module('inspinia')
    .provider('storageService', function() {
        
        return {
            $get: function () {
                return {
                    createCookie: createCookie,
                    readCookie: readCookie,
                    eraseCookie: eraseCookie,
                    getBearer: getBearer,
                    getFullBearer: getFullBearer,
                    setBearer: setBearer,
                    deleteBearer: deleteBearer,
                    keyWord: 'Bearer',
                    securityHeaderName: 'Authorization'
                }
            }
        };

        function createCookie(name,value,days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
            }
            else var expires = "";
            document.cookie = name+"="+value+expires+"; path=/";
        }

        function readCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        }

        function eraseCookie(name) {
            createCookie(name,"",-1);
        }

        function getBearer() {
            return readCookie(this.keyWord);
        }

        function getFullBearer() {
            return this.keyWord + ' ' + readCookie(this.keyWord);
        }

        function setBearer(value) {
            createCookie(this.keyWord, value, 365);
        }

        function deleteBearer() {
            eraseCookie(this.keyWord);
        }
});


