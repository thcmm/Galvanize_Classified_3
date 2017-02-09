<!-- /////////////////////////////////////
     // classified-detail.compontent.js //
     // Galvanize Classified 2          //
     ///////////////////////////////////// -->

(function() {
  'use strict';

  angular.module('app')
    .component('classifiedDetail', {
      templateUrl: '/js/classifieds/classified-detail.template.html',
      controller: controller
    })

  controller.$inject = ['$http', '$stateParams', '$state']
  function controller($http, $stateParams, $state) {
    const vm = this
    let unalteredAdvertData = {};

    vm.$onInit = onInit
    vm.updateClassified = updateClassified
    vm.deleteClassified = deleteClassified
    vm.cancleUpdate     = cancleUpdate

    function onInit() {
      $http.get(`/classifieds/${$stateParams.id}`)
        .then(response => {
          console.log(response);
          vm.classified = response.data
          vm.unalteredAdvertData = JSON.parse(JSON.stringify(vm.classified));
          // console.log("After copy: vm.unalteredAdvertData = ", vm.unalteredAdvertData);

        })
    }

    function updateClassified() {
      $http.patch(`/classifieds/${$stateParams.id}`, vm.classified)
        .then(response => {
            $state.go('home')
        })
    }

    function deleteClassified() {
      $http.delete(`/classifieds/${$stateParams.id}`)
        .then(response => {
            $state.go('home')
        })
    }
    // TODO: Reperara dessa funktionen
    function cancleUpdate() {
      // $http.get(`/classifieds/${$stateParams.id}`)
      //   .then(response => {
      //     vm.classified = response.data
      //     $state.go('home')
      //   })
      console.log("f:cancleUpdate");
      $http.patch(`/classifieds/${$stateParams.id}`, vm.unalteredAdvertData)
        .then(response => {
            $state.go('home')
        })
    }
  }

}());
