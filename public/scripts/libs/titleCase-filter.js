/**
 * Created by hollandben from comments on https://gist.github.com/maruf-nc/5625869.
 */
angular.module('customFilters', [])
    .filter('titleCase', function() {
        return function(str) {
            return (str == undefined || str === null) ? '' : str.replace(/_|-/, ' ').replace(/\w\S*/g, function(txt){
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
    });