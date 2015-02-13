// ﻿(function () {
//     var app = angular.module('proksi');

//     app.controller('JobController',['JobRepository', function (JobRepository) {
//         var vm = this;
//         getJobs();
//         vm.getUser = function(){
//             console.log(Facebook.getUserID().getUserID());
//         }
                
//         function getJobs() {
//             JobRepository.getItems()
//             .success(function (data) {
//                 vm.jobs = data.jobs;
//             })
//             .error(function (error) {
//                 console.log('Unable to load job data: ' + error.message);
//             });
//         };

//     }]);
// })();