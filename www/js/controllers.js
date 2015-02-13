angular.module('starter.controllers', ['proksi', 'starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $location, $window, Modal) {
  $scope.isLogin = false;

  $scope.refresh = refresh;
  function refresh(){
    $window.location.reload(true);
  };

  openFB.api({
        path: '/me',
        params: {fields: 'id,name'},
        success: function(user) {
            $scope.$apply(function() {
                $scope.user = user;
                $scope.isLogin = true;
            });
        },
        error: function(error) {
            $scope.isLogin = false;
        }
    });
  // Form data for the login modal
  $scope.loginData = {};
  
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  Modal.setModal($scope.modal);
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  Modal.setModal($scope.modal);
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  Modal.setModal($scope.modal);
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  $scope.fbLogin = function() {
    openFB.getLoginStatus( function(response){
      if (response.status != 'connected'){
        openFB.login(
          function(response) {
            console.log(response);

            if (response.status === 'connected') {
              console.log('Facebook login succeeded');
              $scope.closeLogin();
              $scope.isLogin = true;
            } else {
              alert('Facebook login failed');
              $scope.isLogin = false;
              $location.path("/jobs");
            }
          },{ scope: 'email,publish_actions'}
        );//end of login function
      }else {
        openFB.logout(
        function(response){
            $scope.isLogin = false;
      $window.location.reload(true);
         });
      }
    });
  };
})

.controller('JobsCtrl', function($scope, JobRepository) {
  $scope.jobs = getJobs();

  $scope.getImage = function(fbId){
    return "https://graph.facebook.com/" + fbId + "/picture?type=square"
  }
  function getJobs() {
            JobRepository.getItems()
            .success(function (data) {
                $scope.jobs = data.jobs;
            })
            .error(function (error) {
                console.log('Unable to load job data: ' + error.message);
            });
        };
})

.controller('JobCtrl', function($scope, $stateParams, $location, JobRepository, MessageRepository) {
  $scope.job = getJob();
  $scope.isLogin = false;
  $scope.message = {};
  $scope.message.isRead = false;
  $scope.getImage = function(fbId){
    return "https://graph.facebook.com/" + fbId + "/picture?type=square"
  }
    $scope.updateEditor = function() {
    var element = document.getElementById("message");
    element.style.height = element.scrollHeight + "px";
};
  function getJob() {
            JobRepository.getItem($stateParams.Id)
            .success(function (data) {
                $scope.job = data.job;
                $scope.message.recipient_id = $scope.job.user_id;
            })
            .error(function (error) {
                console.log('Unable to load job data: ' + error.message);
            });
        };

        openFB.api({
        path: '/me',
        params: {fields: 'id,name'},
        success: function(user) {
            $scope.$apply(function() {
                $scope.user = user;
                $scope.isLogin = true;
                $scope.message.sender_id = $scope.user.id;
            });
        },
        error: function(error) {
            $scope.isLogin = false;
        }
    });


        $scope.sendMessage = sendMessage;
                function sendMessage() {
            MessageRepository.insertItem($scope.message)
            .success(function (data) {
                $location.path("/jobs");
            })
            .error(function (error) {
              alert('Unable to send message.');
            });
        };

})



.controller('PostJobCtrl', function($scope, $location, JobRepository) {
                $scope.form = {};
                $scope.form.user_id = '';
                $scope.user = {};
                $scope.isLogin = false;
openFB.api({
        path: '/me',
        params: {fields: 'id,name'},
        success: function(user) {
            $scope.$apply(function() {
                $scope.user = user;
                $scope.form.user_id = $scope.user.id;
                $scope.isLogin = true;
            });
        },
        error: function(error) {
            $location.path("/jobs");
        }
    });

                $scope.submitJob = submitJob;
                function submitJob() {
            JobRepository.insertItem($scope.form)
            .success(function (data) {
                $location.path("/jobs");
            })
            .error(function (error) {
              alert('Unable to load job data');
                console.log('Unable to load job data');
            });
        };

})

.controller('UserMessageCtrl', function($scope, $location, UserMessageRepository, facebookRepository) {

                $scope.form = {};
                $scope.form.user_id = '';
                $scope.user = {};
                $scope.isLogin = false;

  $scope.getImage = function(fbId){
    return "https://graph.facebook.com/" + fbId + "/picture?type=square"
  }
openFB.api({
        path: '/me',
        params: {fields: 'id,name'},
        success: function(user) {
            $scope.$apply(function() {
                $scope.user = user;
                $scope.form.user_id = $scope.user.id;
                $scope.isLogin = true;
                getMessages();
                getProfile();
            });
        },
        error: function(error) {
          console.log("message: not login.");
            $location.path("/jobs");
        }
    });
      

    function getMessages() {
            UserMessageRepository.getItem($scope.user.id)
            .success(function (data) {
                $scope.messages = data.user_messages;
            })
            .error(function (error) {
                console.log('Unable to load job data: ' + error.message);
            });
        };


    function getProfile() {
            // facebookRepository.getProfile($scope.user.id)
            // .success(function (data) {
            //     console.log(data);
            // })
            // .error(function (error) {
            //     console.log('Unable to load job data: ' + error.message);
            // });
        };

})

.controller('ReplyCtrl', function($scope, $stateParams, $location, MessageRepository) {
  $scope.userMessage = getMessage();
  $scope.isLogin = false;
  $scope.reply = {};
  $scope.reply.isRead = false;
  $scope.getImage = function(fbId){
    return "https://graph.facebook.com/" + fbId + "/picture?type=square"
  }
    $scope.updateEditor = function() {
    var element = document.getElementById("message");
    element.style.height = element.scrollHeight + "px";
};
  function getMessage() {
            MessageRepository.getItem($stateParams.Id)
            .success(function (data) {
                $scope.userMessage = data.message;
                console.log($scope.userMessage);
                $scope.reply.recipient_id = $scope.userMessage.sender_id;
            })
            .error(function (error) {
                console.log('Unable to load job data: ' + error.message);
            });
        };

        openFB.api({
        path: '/me',
        params: {fields: 'id,name'},
        success: function(user) {
            $scope.$apply(function() {
                $scope.user = user;
                $scope.isLogin = true;
                $scope.reply.sender_id = $scope.user.id;
            });
        },
        error: function(error) {
            $scope.isLogin = false;
        }
    });


        $scope.sendMessage = sendMessage;
                function sendMessage() {
            MessageRepository.insertItem($scope.reply)
            .success(function (data) {
                $location.path("/jobs");
            })
            .error(function (error) {
              alert('Unable to send message.');
            });
        };

})