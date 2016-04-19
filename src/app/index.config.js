(function() {
  'use strict';

  angular
    .module('app')
    .config(configTranslation)
    .config(configCompilerProvider)
    .config(configFlowFactoryProvider);


  /** @ngInject */
  function configTranslation ($translateProvider){
    $translateProvider.useUrlLoader('http://localhost:8080/messageBundle');
    $translateProvider.useStorage('UrlLanguageStorage');
    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');
  }

  /** @ngInject */
  function configFlowFactoryProvider (flowFactoryProvider){
    flowFactoryProvider.defaults = {
      target:'',
      permanentErrors: [500,501],
      maxChunkRetries: 1,
      chunkRetryInterval: 5000,
      simultaneousUploads: 4,
      singleFile: false
    };
    /*flowFactoryProvider.on('catchAll', function () {
     console.log('catchAll', arguments);
     });*/

  }

  /**@ngInject */
  function configCompilerProvider ($compileProvider){
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(http?|ftp|mailto|file|chrome-extension):/);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(heep?|local|data):/);
  }

})();
