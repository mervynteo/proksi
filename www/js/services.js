angular.module('starter.services', ['ngResource'])

.factory('Session', function ($resource) {
    return $resource('http://localhost:5000/sessions/:sessionId');
})
.factory('Modal', function() {
		var vm = {};
        return {
            setModal: function(modal){
				vm.modal = modal
			},
			getModal: function(){
				return vm.modal
			}			
        }
});