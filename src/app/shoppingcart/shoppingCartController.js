(function(){

  'use strict';

  angular
    .module('app')
    .controller('shoppingCartController',ShoppingCartController);


  /** @ngInject */
  function ShoppingCartController($scope, shoppingCartService, $location, $rootScope,$rootParams) {
    var vm = this;
    var id = $rootParams.id;
    shoppingCartService.get({id: id}, function (data) {
      vm.cart = data;
    })

    $scope.$on('$locationChangeStart', function () {
      $rootScope.cartUpdateSuccess = false;

    });

    vm.updateCart = function () {
      shoppingCartService.update({id: id}, vm.cart, function () {
        $rootScope.cartUpdateSuccess = true;

      });
    }

    vm.totalEach = function (index) {
      return vm.cart.selectedProducts[index].product.totalPrice * vm.cart.selectedProducts[index].amount;
    }

    vm.total = function () {
      var total = 0;
      angular.forEach(vm.cart.selectedProducts, function (item) {
        total += item.amount * item.product.totalPrice;
      })

      return total;
    }
  }


})();
