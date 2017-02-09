(function() {
    'use strict'

    angular.module('app')
        .component('classifiedList', {
            require: {
                layout: '^app'
            },
            templateUrl: '/js/classifieds/classified-list.template.html',
            controller: controller
        })

    controller.$inject = ['$http']

    function controller($http) {
        const vm = this;
        let showCreateClassified = false; // Dölj skapa annons block
        let showView1 = true;  // avlång visa utformning A
        let showView2 = false; // avlång visa utformning B
        let showView3 = false; // avlång visa utformning C
        let sortClassifiedBy = 'id';
        let sortingBy = 'Id'; // Sort
        let searchBy = ''; // Filter

        vm.$onInit = onInit;
        vm.createClassified = createClassified;
        vm.toggleCreateClassifiedBlock = toggleCreateClassifiedBlock;
        vm.sortClassifieds = sortClassifieds;
        vm.toggleView1 = toggleView1;
        vm.toggleView2 = toggleView2;
        vm.toggleView3 = toggleView3;

        function onInit() {
            vm.toggleView1();
            console.log("classified-list.component: onInit");
            $http.get('/classifieds')
                .then(response => vm.classifieds = response.data);
            //console.log("vm.classifieds response = ", vm.classifieds);
        }

        function createClassified() {
            console.log("f:createClassified | vm.classified = ", vm.classified);
            let rndImg = Math.floor((Math.random() * 10) + 1);
            let urlStr = 'http://lorempixel.com/400/200/sports/' + rndImg; // Add rnd image URL
            vm.classified.item_image = urlStr; //'http://lorempixel.com/400/200/sports/1'
            $http.post('/classifieds', vm.classified)
                .then(response => {
                    console.log("response", response.data);
                    vm.classifieds.push(response.data)
                    delete vm.classified
                })
        }

        function toggleCreateClassifiedBlock() {
            // console.log("f:toggleCreateClassifiedBlock");
            vm.showCreateClassified = !vm.showCreateClassified;
            console.log("f:toggleCreateClassifiedBlock: ", vm.showCreateClassified);
        }
        // TODO fix toggle functionality
        function toggleView1() {
            // console.log("f:toggleCreateClassifiedBlock");
            vm.showView1 = !vm.showView1;
            if (vm.showView1) {vm.showView2 = false; vm.showView3=false;}
            console.log("f:toggleView1: ", vm.showView1);
        }

        function toggleView2() {
            // console.log("f:toggleCreateClassifiedBlock");
            vm.showView2 = !vm.showView2;
            if (vm.showView2) {vm.showView1 = false; vm.showView3=false;}
            console.log("f:toggleView2: ", vm.showView2);
        }

        function toggleView3() {
            // console.log("f:toggleCreateClassifiedBlock");
            vm.showView3 = !vm.showView3;
            if (vm.showView3) {vm.showView1 = false; vm.showView2=false;}
            console.log("f:toggleView3: ", vm.showView3);
        }

        function sortClassifieds(by) {
            console.log('f:sortClassifieds = ', by);
            switch (by) {
                case "id":
                    vm.sortClassifiedBy = 'id';
                    vm.sortingBy = "Id"
                    break;
                case "date":
                    vm.sortClassifiedBy = 'date';
                    vm.sortingBy = "Date"
                    break;
                case "price":
                    vm.sortClassifiedBy = 'price';
                    vm.sortingBy = "Price"
                    break;
            }
        }
    }
}());
