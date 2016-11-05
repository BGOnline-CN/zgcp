/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS
 * 
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: http://support.wrapbootstrap.com/knowledge_base/topics/usage-licenses
 * 
 */

if (typeof $ === 'undefined') { throw new Error('This application\'s JavaScript requires jQuery'); }

// APP START
// ----------------------------------- 

var App = angular.module('angle', [
    'ngRoute',
    'ngAnimate',
    'ngStorage',
    'ngCookies',
    'pascalprecht.translate',
    'ui.bootstrap',
    'ui.router',
    'oc.lazyLoad',
    'cfp.loadingBar',
    'ngSanitize',
    'ngResource',
    'ui.utils'
  ]);

App.run(["$rootScope", "$state", "$stateParams",  '$window', '$templateCache', function ($rootScope, $state, $stateParams, $window, $templateCache) {
    // Set reference to access them from any scope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$storage = $window.localStorage;

    // 彩票列表图片
    $rootScope.lotteryList = [
        { img:'app/img/ssq.png', name: '双色球', lotteryCode: 'ssq'},
        { img:'app/img/qxc.png', name: '七星彩', lotteryCode: 'qxc'},
        { img:'app/img/cqssc.png', name: '时时彩', lotteryCode: 'cqssc'},
        { img:'app/img/dlt.png', name: '大乐透', lotteryCode: 'dlt'},
        { img:'app/img/pl5.png', name: '排列5', lotteryCode: 'pl5'},
        { img:'app/img/qlc.png', name: '七乐彩', lotteryCode: 'qlc'},
        { img:'app/img/fc3d.png', name: '福彩3D', lotteryCode: 'fc3d'}
    ]

    // $rootScope.rootUrl = 'http://192.168.1.200/201609zhugecaipiao/backend/web/';
    // $rootScope.rootImgUrl = 'http://192.168.1.200/201609zhugecaipiao';

    $rootScope.rootUrl = 'http://zhugecaipiao.thinktorch.cn/backend/web/';
    $rootScope.rootImgUrl = 'http://zhugecaipiao.thinktorch.cn';

    // Uncomment this to disable template cache
    /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (typeof(toState) !== 'undefined'){
          $templateCache.remove(toState.templateUrl);
        }
    });*/

    // Scope Globals
    // ----------------------------------- 
    $rootScope.app = {
      name: '诸葛彩票',
      description: '诸葛彩票',
      year: ((new Date()).getFullYear()),
      layout: {
        isFixed: true,
        isCollapsed: false,
        isBoxed: false,
        isRTL: false,
        horizontal: false,
        isFloat: false,
        asideHover: false,
        theme: null
      },
      useFullLayout: false,
      hiddenFooter: false,
      viewAnimation: 'ng-fadeInUp'
    };
    $rootScope.user = {
      name:     'John',
      job:      'ng-developer',
      picture:  'app/img/user/02.jpg'
    };

}]);

/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/

App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
  'use strict';

  // Set the following to true to enable the HTML5 Mode
  // You may have to set <base> tag in index and a routing configuration in your server
  $locationProvider.html5Mode(false);

  // default route
  $urlRouterProvider.otherwise('/page/login');

  // 
  // Application Routes
  // -----------------------------------   
  $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: helper.basepath('app.html'),
        controller: 'AppController',
        resolve: helper.resolveFor('modernizr', 'icons')
    })
    .state('app.homePage', {
        url: '/homePage',
        title: '首页',
        templateUrl: helper.basepath('homePage.html')
    })
    
    .state('app.lotteryDetails', {
        url: '/lotteryDetails',
        title: '开奖详情',
        templateUrl: helper.basepath('lotteryDetails.html')
    })

    .state('app.setLottery', {
        url: '/setLottery',
        title: '彩票配置',
        templateUrl: helper.basepath('setLottery.html')
    })

    .state('app.lotteryConfig', {
        url: '/lotteryConfig',
        title: '开奖配置',
        templateUrl: helper.basepath('lotteryConfig.html')
    })
    .state('app.category', {
        url: '/category',
        title: '分类',
        templateUrl: helper.basepath('category.html'),
        resolve: helper.resolveFor('treeControl')   
    })
    .state('app.coupon', {
        url: '/coupon',
        title: '点券',
        templateUrl: helper.basepath('coupon.html')
    })
    .state('app.news', {
        url: '/news',
        title: '热门资讯',
        templateUrl: helper.basepath('news.html')
    })
    .state('app.strategy', {
        url: '/strategy',
        title: '攻略',
        templateUrl: helper.basepath('strategy.html')
    })
    .state('app.ad', {
        url: '/ad',
        title: '广告',
        templateUrl: helper.basepath('ad.html')
    })
    .state('app.userList', {
        url: '/userList',
        title: '用户列表',
        templateUrl: helper.basepath('userList.html')
    })
    .state('app.check-ins', {
        url: '/check-ins',
        title: '签到配置',
        templateUrl: helper.basepath('check-ins.html')
    })

    .state('app.addArticle', {
        url: '/addArticle',
        title: '文章管理',
        templateUrl: helper.basepath('addArticle.html'),
        resolve: helper.resolveFor('jquery', 'editor', 'angularFileUpload') 
    })

    .state('app.system', {
        url: '/system',
        title: '系统配置',
        templateUrl: helper.basepath('system.html')
    })

    .state('app.lotteryHistory', {
        url: '/lotteryHistory',
        title: '开奖历史',
        templateUrl: helper.basepath('lotteryHistory.html')
    })
    
    // page
    .state('page', {
        url: '/page',
        templateUrl: 'app/pages/page.html',
        resolve: helper.resolveFor('modernizr', 'icons'),
        controller: ["$rootScope", function($rootScope) {
            $rootScope.app.layout.isBoxed = false;
        }]
    })
    .state('page.login', {
        url: '/login',
        title: "登录",
        templateUrl: 'app/pages/login.html'
    })
    .state('page.lock', {
        url: '/lock',
        title: "锁定",
        templateUrl: 'app/pages/lock.html'
    })
    .state('page.404', {
        url: '/404',
        title: "Not Found",
        templateUrl: 'app/pages/404.html'
    })
    // 
    // CUSTOM RESOLVES
    //   Add your own resolves properties
    //   following this object extend
    //   method
    // ----------------------------------- 
    // .state('app.someroute', {
    //   url: '/some_url',
    //   templateUrl: 'path_to_template.html',
    //   controller: 'someController',
    //   resolve: angular.extend(
    //     helper.resolveFor(), {
    //     // YOUR RESOLVES GO HERE
    //     }
    //   )
    // })
    ;


}]).config(['$ocLazyLoadProvider', 'APP_REQUIRES', function ($ocLazyLoadProvider, APP_REQUIRES) {
    'use strict';

    // Lazy Load modules configuration
    $ocLazyLoadProvider.config({
      debug: false,
      events: true,
      modules: APP_REQUIRES.modules
    });

}]).config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ( $controllerProvider, $compileProvider, $filterProvider, $provide) {
      'use strict';
      // registering components after bootstrap
      App.controller = $controllerProvider.register;
      App.directive  = $compileProvider.directive;
      App.filter     = $filterProvider.register;
      App.factory    = $provide.factory;
      App.service    = $provide.service;
      App.constant   = $provide.constant;
      App.value      = $provide.value;

}]).config(['$translateProvider', function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix : 'app/i18n/',
        suffix : '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage();
    $translateProvider.usePostCompiling(true);

}]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
    cfpLoadingBarProvider.parentSelector = '.wrapper > section';
}]).config(['$tooltipProvider', function ($tooltipProvider) {

    $tooltipProvider.options({appendToBody: true});

}]).config(function($httpProvider) { // CORS post跨域配置
    $httpProvider.defaults.useXDomain = true;  
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    delete $httpProvider.defaults.headers.common['X-Requested-With']; 
})
;

/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/
App
  .constant('APP_COLORS', {
    'primary':                '#5d9cec',
    'success':                '#27c24c',
    'info':                   '#23b7e5',
    'warning':                '#ff902b',
    'danger':                 '#f05050',
    'inverse':                '#131e26',
    'green':                  '#37bc9b',
    'pink':                   '#f532e5',
    'purple':                 '#7266ba',
    'dark':                   '#3a3f51',
    'yellow':                 '#fad732',
    'gray-darker':            '#232735',
    'gray-dark':              '#3a3f51',
    'gray':                   '#dde6e9',
    'gray-light':             '#e4eaec',
    'gray-lighter':           '#edf1f2'
  })
  .constant('APP_MEDIAQUERY', {
    'desktopLG':             1200,
    'desktop':                992,
    'tablet':                 768,
    'mobile':                 480
  })
  .constant('APP_REQUIRES', {
    // jQuery based and standalone scripts
    scripts: {
      'modernizr':          ['vendor/modernizr/modernizr.js'],
      'icons':              ['vendor/fontawesome/css/font-awesome.min.css',
                             'vendor/simple-line-icons/css/simple-line-icons.css'],
      'jquery':             ['vendor/jquery/jquery-1.10.2.min.js'],
      'editor':             ['vendor/editor/dist/css/wangEditor.min.css', 
                             'vendor/editor/dist/js/wangEditor.min.js']
    },
    // Angular based script (use the right module name)
    modules: [
      { name: 'treeControl', files: ['vendor/angular-tree/js/angular-tree-control.js',
                                     'vendor/angular-tree/css/tree-control.css',
                                     'vendor/angular-tree/css/tree-control-attribute.css']},
      { name: 'angularFileUpload', files: ['vendor/angular-file-upload/angular-file-upload.js']},
    ]

  })
;
/**=========================================================
 * Module: main.js
 * Main Application Controller
 =========================================================*/

App.controller('AppController',
  ['$rootScope', '$scope', '$state', '$translate', '$window', '$localStorage', '$timeout', 'toggleStateService', 'colors', 'browser', 'cfpLoadingBar',
  function($rootScope, $scope, $state, $translate, $window, $localStorage, $timeout, toggle, colors, browser, cfpLoadingBar) {
    "use strict";

    // Setup the layout mode
    $rootScope.app.layout.horizontal = ( $rootScope.$stateParams.layout == 'app-h') ;

    // Loading bar transition
    // ----------------------------------- 
    var thBar;
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if($('.wrapper > section').length) // check if bar container exists
          thBar = $timeout(function() {
            cfpLoadingBar.start();
          }, 0); // sets a latency Threshold
    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        event.targetScope.$watch("$viewContentLoaded", function () {
          $timeout.cancel(thBar);
          cfpLoadingBar.complete();
        });
    });


    // Hook not found
    $rootScope.$on('$stateNotFound',
      function(event, unfoundState, fromState, fromParams) {
          console.log(unfoundState.to); // "lazy.state"
          console.log(unfoundState.toParams); // {a:1, b:2}
          console.log(unfoundState.options); // {inherit:false} + default options
      });
    // Hook error
    $rootScope.$on('$stateChangeError',
      function(event, toState, toParams, fromState, fromParams, error){
        console.log(error);
      });
    // Hook success
    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        // display new view from top
        $window.scrollTo(0, 0);
        // Save the route title
        $rootScope.currTitle = $state.current.title;
      });

    $rootScope.currTitle = $state.current.title;
    $rootScope.pageTitle = function() {
      var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
      document.title = title;
      return title; 
    };

    // iPad may presents ghost click issues
    // if( ! browser.ipad )
      // FastClick.attach(document.body);

    // Close submenu when sidebar change from collapsed to normal
    $rootScope.$watch('app.layout.isCollapsed', function(newValue, oldValue) {
      if( newValue === false )
        $rootScope.$broadcast('closeSidebarMenu');
    });

    // Restore layout settings
    if( angular.isDefined($localStorage.layout) )
      $scope.app.layout = $localStorage.layout;
    else
      $localStorage.layout = $scope.app.layout;

    $rootScope.$watch("app.layout", function () {
      $localStorage.layout = $scope.app.layout;
    }, true);

    
    // Allows to use branding color with interpolation
    // {{ colorByName('primary') }}
    $scope.colorByName = colors.byName;

    // Internationalization
    // ----------------------

    $scope.language = {
      // Handles language dropdown
      listIsOpen: false,
      // list of available languages
      available: {
        'en':       'English',
        'es_AR':    'Español'
      },
      // display always the current ui language
      init: function () {
        var proposedLanguage = $translate.proposedLanguage() || $translate.use();
        var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
        $scope.language.selected = $scope.language.available[ (proposedLanguage || preferredLanguage) ];
      },
      set: function (localeId, ev) {
        // Set the new idiom
        $translate.use(localeId);
        // save a reference for the current language
        $scope.language.selected = $scope.language.available[localeId];
        // finally toggle dropdown
        $scope.language.listIsOpen = ! $scope.language.listIsOpen;
      }
    };

    $scope.language.init();

    // Restore application classes state
    toggle.restoreState( $(document.body) );

    // cancel click event easily
    $rootScope.cancel = function($event) {
      $event.stopPropagation();
    };

}]);

/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

App.controller('SidebarController', ['$rootScope', '$scope', '$state', '$http', '$timeout', 'Utils',
  function($rootScope, $scope, $state, $http, $timeout, Utils){

    var collapseList = [];

    // demo: when switch from collapse to hover, close all items
    $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
      if ( newVal === false && oldVal === true) {
        closeAllBut(-1);
      }
    });

    // Check item and children active state
    var isActive = function(item) {

      if(!item) return;

      if( !item.sref || item.sref == '#') {
        var foundActive = false;
        angular.forEach(item.submenu, function(value, key) {
          if(isActive(value)) foundActive = true;
        });
        return foundActive;
      }
      else
        return $state.is(item.sref) || $state.includes(item.sref);
    };

    // Load menu from json file
    // ----------------------------------- 
    
    $scope.getMenuItemPropClasses = function(item) {
      return (item.heading ? 'nav-heading' : '') +
             (isActive(item) ? ' active' : '') ;
    };

    $scope.loadSidebarMenu = function() {

      var menuJson = 'server/sidebar-menu.json',
          menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
      $http.get(menuURL)
        .success(function(items) {
           $scope.menuItems = items;
        })
        .error(function(data, status, headers, config) {
          alert('Failure loading menu');
        });
     };

     $scope.loadSidebarMenu();

    // Handle sidebar collapse items
    // ----------------------------------- 

    $scope.addCollapse = function($index, item) {
      collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
    };

    $scope.isCollapse = function($index) {
      return (collapseList[$index]);
    };

    $scope.toggleCollapse = function($index, isParentItem) {


      // collapsed sidebar doesn't toggle drodopwn
      if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;

      // make sure the item index exists
      if( angular.isDefined( collapseList[$index] ) ) {
        if ( ! $scope.lastEventFromChild ) {
          collapseList[$index] = !collapseList[$index];
          closeAllBut($index);
        }
      }
      else if ( isParentItem ) {
        closeAllBut(-1);
      }
      
      $scope.lastEventFromChild = isChild($index);

      return true;
    
    };

    function closeAllBut(index) {
      index += '';
      for(var i in collapseList) {
        if(index < 0 || index.indexOf(i) < 0)
          collapseList[i] = true;
      }
    }

    function isChild($index) {
      return (typeof $index === 'string') && !($index.indexOf('-') < 0);
    }

}]);

/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

App.directive('searchOpen', ['navSearch', function(navSearch) {
  'use strict';

  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element) {
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', navSearch.toggle);
    }]
  };

}]).directive('searchDismiss', ['navSearch', function(navSearch) {
  'use strict';

  var inputSelector = '.navbar-form input[type="text"]';

  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element) {

      $(inputSelector)
        .on('click', function (e) { e.stopPropagation(); })
        .on('keyup', function(e) {
          if (e.keyCode == 27) // ESC
            navSearch.dismiss();
        });
        
      // click anywhere closes the search
      $(document).on('click', navSearch.dismiss);
      // dismissable options
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', navSearch.dismiss);
    }]
  };

}]);


/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

App.directive('sidebar', ['$rootScope', '$window', 'Utils', function($rootScope, $window, Utils) {
  
  var $win  = $($window);
  var $body = $('body');
  var $scope;
  var $sidebar;
  var currentState = $rootScope.$state.current.name;

  return {
    restrict: 'EA',
    template: '<nav class="sidebar" ng-transclude></nav>',
    transclude: true,
    replace: true,
    link: function(scope, element, attrs) {
      
      $scope   = scope;
      $sidebar = element;

      var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
      var subNav = $();
      $sidebar.on( eventName, '.nav > li', function() {

        if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

          subNav.trigger('mouseleave');
          subNav = toggleMenuItem( $(this) );

          // Used to detect click and touch events outside the sidebar          
          sidebarAddBackdrop();

        }

      });

      scope.$on('closeSidebarMenu', function() {
        removeFloatingNav();
      });

      // Normalize state when resize to mobile
      $win.on('resize', function() {
        if( ! Utils.isMobile() )
          $body.removeClass('aside-toggled');
      });

      // Adjustment on route changes
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        currentState = toState.name;
        // Hide sidebar automatically on mobile
        $('body.aside-toggled').removeClass('aside-toggled');

        $rootScope.$broadcast('closeSidebarMenu');
      });

      // Allows to close
      if ( angular.isDefined(attrs.sidebarAnyclickClose) ) {

        $('.wrapper').on('click.sidebar', function(e){
          // don't check if sidebar not visible
          if( ! $body.hasClass('aside-toggled')) return;

          // if not child of sidebar
          if( ! $(e.target).parents('.aside').length ) {
            $body.removeClass('aside-toggled');          
          }

        });
      }

    }
  };

  function sidebarAddBackdrop() {
    var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
    $backdrop.insertAfter('.aside-inner').on("click mouseenter", function () {
      removeFloatingNav();
    });
  }

  // Open the collapse sidebar submenu items when on touch devices 
  // - desktop only opens on hover
  function toggleTouchItem($element){
    $element
      .siblings('li')
      .removeClass('open')
      .end()
      .toggleClass('open');
  }

  // Handles hover to open items under collapsed menu
  // ----------------------------------- 
  function toggleMenuItem($listItem) {

    removeFloatingNav();

    var ul = $listItem.children('ul');
    
    if( !ul.length ) return $();
    if( $listItem.hasClass('open') ) {
      toggleTouchItem($listItem);
      return $();
    }

    var $aside = $('.aside');
    var $asideInner = $('.aside-inner'); // for top offset calculation
    // float aside uses extra padding on aside
    var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
    var subNav = ul.clone().appendTo( $aside );
    
    toggleTouchItem($listItem);

    var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
    var vwHeight = $win.height();

    subNav
      .addClass('nav-floating')
      .css({
        position: $scope.app.layout.isFixed ? 'fixed' : 'absolute',
        top:      itemTop,
        bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
      });

    subNav.on('mouseleave', function() {
      toggleTouchItem($listItem);
      subNav.remove();
    });

    return subNav;
  }

  function removeFloatingNav() {
    $('.dropdown-backdrop').remove();
    $('.sidebar-subnav.nav-floating').remove();
    $('.sidebar li.open').removeClass('open');
  }

}]);
/**=========================================================
 * Module: toggle-state.js
 * Toggle a classname from the BODY Useful to change a state that 
 * affects globally the entire layout or more than one item 
 * Targeted elements must have [toggle-state="CLASS-NAME-TO-TOGGLE"]
 * User no-persist to avoid saving the sate in browser storage
 =========================================================*/

App.directive('toggleState', ['toggleStateService', function(toggle) {
  'use strict';
  
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      var $body = $('body');

      $(element)
        .on('click', function (e) {
          e.preventDefault();
          var classname = attrs.toggleState;
          
          if(classname) {
            if( $body.hasClass(classname) ) {
              $body.removeClass(classname);
              if( ! attrs.noPersist)
                toggle.removeState(classname);
            }
            else {
              $body.addClass(classname);
              if( ! attrs.noPersist)
                toggle.addState(classname);
            }
            
          }

      });
    }
  };
  
}]);

/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

App.service('browser', function(){
  "use strict";

  var matched, browser;

  var uaMatch = function( ua ) {
    ua = ua.toLowerCase();

    var match = /(opr)[\/]([\w.]+)/.exec( ua ) ||
      /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
      /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
      /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
      /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
      /(msie) ([\w.]+)/.exec( ua ) ||
      ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( ua ) ||
      ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
      [];

    var platform_match = /(ipad)/.exec( ua ) ||
      /(iphone)/.exec( ua ) ||
      /(android)/.exec( ua ) ||
      /(windows phone)/.exec( ua ) ||
      /(win)/.exec( ua ) ||
      /(mac)/.exec( ua ) ||
      /(linux)/.exec( ua ) ||
      /(cros)/i.exec( ua ) ||
      [];

    return {
      browser: match[ 3 ] || match[ 1 ] || "",
      version: match[ 2 ] || "0",
      platform: platform_match[ 0 ] || ""
    };
  };

  matched = uaMatch( window.navigator.userAgent );
  browser = {};

  if ( matched.browser ) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.version);
  }

  if ( matched.platform ) {
    browser[ matched.platform ] = true;
  }

  // These are all considered mobile platforms, meaning they run a mobile browser
  if ( browser.android || browser.ipad || browser.iphone || browser[ "windows phone" ] ) {
    browser.mobile = true;
  }

  // These are all considered desktop platforms, meaning they run a desktop browser
  if ( browser.cros || browser.mac || browser.linux || browser.win ) {
    browser.desktop = true;
  }

  // Chrome, Opera 15+ and Safari are webkit based browsers
  if ( browser.chrome || browser.opr || browser.safari ) {
    browser.webkit = true;
  }

  // IE11 has a new token so we will assign it msie to avoid breaking changes
  if ( browser.rv )
  {
    var ie = "msie";

    matched.browser = ie;
    browser[ie] = true;
  }

  // Opera 15+ are identified as opr
  if ( browser.opr )
  {
    var opera = "opera";

    matched.browser = opera;
    browser[opera] = true;
  }

  // Stock Android browsers are marked as Safari on Android.
  if ( browser.safari && browser.android )
  {
    var android = "android";

    matched.browser = android;
    browser[android] = true;
  }

  // Assign the name and platform variable
  browser.name = matched.browser;
  browser.platform = matched.platform;


  return browser;

});


/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/
 
App.factory('colors', ['APP_COLORS', function(colors) {
  
  return {
    byName: function(name) {
      return (colors[name] || '#fff');
    }
  };

}]);

/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/
 
App.service('navSearch', function() {
  var navbarFormSelector = 'form.navbar-form';
  return {
    toggle: function() {
      
      var navbarForm = $(navbarFormSelector);

      navbarForm.toggleClass('open');
      
      var isOpen = navbarForm.hasClass('open');
      
      navbarForm.find('input')[isOpen ? 'focus' : 'blur']();

    },

    dismiss: function() {
      $(navbarFormSelector)
        .removeClass('open')      // Close control
        .find('input[type="text"]').blur() // remove focus
        .val('')                    // Empty input
        ;
    }
  };

});
/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

App.provider('RouteHelpers', ['APP_REQUIRES', function (appRequires) {
  "use strict";

  // Set here the base of the relative path
  // for all app views
  this.basepath = function (uri) {
    return 'app/views/' + uri;
  };

  // Generates a resolve object by passing script names
  // previously configured in constant.APP_REQUIRES
  this.resolveFor = function () {
    var _args = arguments;
    return {
      deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
        // Creates a promise chain for each argument
        var promise = $q.when(1); // empty promise
        for(var i=0, len=_args.length; i < len; i ++){
          promise = andThen(_args[i]);
        }
        return promise;

        // creates promise to chain dynamically
        function andThen(_arg) {
          // also support a function that returns a promise
          if(typeof _arg == 'function')
              return promise.then(_arg);
          else
              return promise.then(function() {
                // if is a module, pass the name. If not, pass the array
                var whatToLoad = getRequired(_arg);
                // simple error check
                if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                // finally, return a promise
                return $ocLL.load( whatToLoad );
              });
        }
        // check and returns required data
        // analyze module items with the form [name: '', files: []]
        // and also simple array of script files (for not angular js)
        function getRequired(name) {
          if (appRequires.modules)
              for(var m in appRequires.modules)
                  if(appRequires.modules[m].name && appRequires.modules[m].name === name)
                      return appRequires.modules[m];
          return appRequires.scripts && appRequires.scripts[name];
        }

      }]};
  }; // resolveFor

  // not necessary, only used in config block for routes
  this.$get = function(){};

}]);


/**=========================================================
 * Module: toggle-state.js
 * Services to share toggle state functionality
 =========================================================*/

App.service('toggleStateService', ['$rootScope', function($rootScope) {

  var storageKeyName  = 'toggleState';

  // Helper object to check for words in a phrase //
  var WordChecker = {
    hasWord: function (phrase, word) {
      return new RegExp('(^|\\s)' + word + '(\\s|$)').test(phrase);
    },
    addWord: function (phrase, word) {
      if (!this.hasWord(phrase, word)) {
        return (phrase + (phrase ? ' ' : '') + word);
      }
    },
    removeWord: function (phrase, word) {
      if (this.hasWord(phrase, word)) {
        return phrase.replace(new RegExp('(^|\\s)*' + word + '(\\s|$)*', 'g'), '');
      }
    }
  };

  // Return service public methods
  return {
    // Add a state to the browser storage to be restored later
    addState: function(classname){
      var data = angular.fromJson($rootScope.$storage[storageKeyName]);
      
      if(!data)  {
        data = classname;
      }
      else {
        data = WordChecker.addWord(data, classname);
      }

      $rootScope.$storage[storageKeyName] = angular.toJson(data);
    },

    // Remove a state from the browser storage
    removeState: function(classname){
      var data = $rootScope.$storage[storageKeyName];
      // nothing to remove
      if(!data) return;

      data = WordChecker.removeWord(data, classname);

      $rootScope.$storage[storageKeyName] = angular.toJson(data);
    },
    
    // Load the state string and restore the classlist
    restoreState: function($elem) {
      var data = angular.fromJson($rootScope.$storage[storageKeyName]);
      
      // nothing to restore
      if(!data) return;
      $elem.addClass(data);
    }

  };

}]);
/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

App.service('Utils', ["$window", "APP_MEDIAQUERY", function($window, APP_MEDIAQUERY) {
    'use strict';
    
    var $html = angular.element("html"),
        $win  = angular.element($window),
        $body = angular.element('body');

    return {
      // DETECTION
      support: {
        transition: (function() {
                var transitionEnd = (function() {

                    var element = document.body || document.documentElement,
                        transEndEventNames = {
                            WebkitTransition: 'webkitTransitionEnd',
                            MozTransition: 'transitionend',
                            OTransition: 'oTransitionEnd otransitionend',
                            transition: 'transitionend'
                        }, name;

                    for (name in transEndEventNames) {
                        if (element.style[name] !== undefined) return transEndEventNames[name];
                    }
                }());

                return transitionEnd && { end: transitionEnd };
            })(),
        animation: (function() {

            var animationEnd = (function() {

                var element = document.body || document.documentElement,
                    animEndEventNames = {
                        WebkitAnimation: 'webkitAnimationEnd',
                        MozAnimation: 'animationend',
                        OAnimation: 'oAnimationEnd oanimationend',
                        animation: 'animationend'
                    }, name;

                for (name in animEndEventNames) {
                    if (element.style[name] !== undefined) return animEndEventNames[name];
                }
            }());

            return animationEnd && { end: animationEnd };
        })(),
        requestAnimationFrame: window.requestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.msRequestAnimationFrame ||
                               window.oRequestAnimationFrame ||
                               function(callback){ window.setTimeout(callback, 1000/60); },
        touch: (
            ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
            (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
            (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
            (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
            false
        ),
        mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
      },
      // UTILITIES
      isInView: function(element, options) {

          var $element = $(element);

          if (!$element.is(':visible')) {
              return false;
          }

          var window_left = $win.scrollLeft(),
              window_top  = $win.scrollTop(),
              offset      = $element.offset(),
              left        = offset.left,
              top         = offset.top;

          options = $.extend({topoffset:0, leftoffset:0}, options);

          if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
              left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
            return true;
          } else {
            return false;
          }
      },
      langdirection: $html.attr("dir") == "rtl" ? "right" : "left",
      isTouch: function () {
        return $html.hasClass('touch');
      },
      isSidebarCollapsed: function () {
        return $body.hasClass('aside-collapsed');
      },
      isSidebarToggled: function () {
        return $body.hasClass('aside-toggled');
      },
      isMobile: function () {
        return $win.width() < APP_MEDIAQUERY.tablet;
      }
    };
}]);


//go 2016/10/26 BGONLINE.CN

App.directive('sex', function() { // 性别
    return {
        restrict: 'A', 
        replace: true,
        scope: {
            sex: '@sex', 
        },
        template: '<div>'+
                    '<span ng-if="sex == 1">男</span>'+
                    '<span ng-if="sex == 2">女</span>'+
                    '<span ng-if="sex == 0">保密</span>'+
                  '</div>'
    }
})


App.directive('selectLottery', function() { // 选择彩种
    return {
        restrict: 'A',
        replace: true,
        template: '<div dropdown="" class="btn-group">'+
                      '<button type="button" dropdown-toggle="" class="btn btn-default select-btn"'+
                                'ng-repeat="o in lotteryList" ng-if="lottery_code == o.lotteryCode">'+
                                '{{o.name}} '+
                          '<span class="caret" style="color: #78A7DE"></span>'+
                      '</button>'+
                      '<ul role="menu" class="dropdown-menu dropdown-menu-left animated fadeInUpShort">'+
                          '<li ng-repeat="o in lotteryList"><a ng-click="">{{o.name}}</a>'+
                          '</li>'+
                      '</ul>'+
                  '</div>',
        controller: function($scope, ParamTransmit) {
            var lottery = ParamTransmit.getParam();
            $scope.lottery_code = lottery.lottery_code;

        }
                
    }

})


App.directive('orderBy', function() { // 排序
    return {
        restrict: 'A',
        replace: true,
        template: '<div dropdown="" class="btn-group">'+
                      '<button type="button" dropdown-toggle="" class="btn btn-default select-btn"'+
                                'ng-repeat="o in lotteryList" ng-if="lottery_code == o.lotteryCode">'+
                                '{{o.name}} '+
                          '<span class="caret" style="color: #78A7DE"></span>'+
                      '</button>'+
                      '<ul role="menu" class="dropdown-menu dropdown-menu-left animated fadeInUpShort">'+
                          '<li ng-repeat="o in lotteryList"><a ng-click="">{{o.name}}</a>'+
                          '</li>'+
                      '</ul>'+
                  '</div>',
        controller: function($scope, ParamTransmit) {
            var lottery = ParamTransmit.getParam();
            $scope.lottery_code = lottery.lottery_code;
        }
                
    }

})


App.directive('noData', function() { // 无此期号数据
    return {
        restrict: 'E',
        replace: true,
        template: '<div style="line-height: 100px;height: 100px;font-size: 1.5em;">此期号无数据</div>'  
    }

})


App.directive('lotteryIssue', function() { // 输入期数查询
    return {
        restrict: 'A',
        replace: true,
        template: '<div style="display: inline-block;margin-left: 10px;vertical-align: middle;">'+
                      '<input type="text" class="form-control" style="display: inline-block;width: 70%;padding: 3px 12px;height: 28px;" ng-model="expect">'+
                  '</div>',
        controller: function($rootScope, $scope, ParamTransmit, ConnectApi, $timeout) {
            var lottery = ParamTransmit.getParam();
            $scope.expect = lottery.expect;
            var timeout;
            $scope.$watch('expect', function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    if(timeout) $timeout.cancel(timeout);
                        timeout = $timeout(function() {
                            $rootScope.isLoading = true;
                            $scope.param = lottery;
                            $scope.param.expect = $scope.expect;
                            ConnectApi.start('post', 'lottery/lottery_results', $scope.param).then(function(response) {
                                var data = ConnectApi.data(response);
                                $scope.data = data.data;
                                if(!$scope.data) {
                                    $scope.isHaveData = false;
                                }else {
                                    $scope.isHaveData = true;
                                    $scope.param.expect = $rootScope.expect = $scope.expect;
                                    ParamTransmit.setParam($scope.param);
                                }
                                $rootScope.isLoading = false;
                            });


                            // $scope.param = ParamTransmit.getParam();
                            // $scope.param.token = sessionStorage.token;
                            // $scope.param.p = 0;
                            // $scope.param.status = 2;

                            // ConnectApi.start('post', 'lottery/lottery_order', $scope.param).then(function(response) {
                            //     var data = ConnectApi.data(response);
                            //     $scope.data = data.data.mod_data;
                            // });


                    }, 800);
                }
            })
        }
    }
})




App.directive('loadingFont', function() { // loading
    return {
        restrict: 'A',
        replace: true,
        template: '<div style="position: absolute;top: 50%;left: 45%;" ng-show="isLoading">'+
                      '<i class="fa fa-spinner fa-pulse" style="margin-left: 10px;font-size: 2em;color: #7895AF"></i>'+
                  '</div>',
        controller: function($rootScope) {
            $rootScope.isLoading = false;
        }
    }
})




App.directive('issue', function() { // 期号标题
    return {
        restrict: 'A',
        replace: true,
        template: '<div style="display: inline-block;">'+
                      '<span ng-repeat="o in lotteryList" ng-if="lottery_code == o.lotteryCode">{{ o.name + " " + expect }}期</span>'+
                  '</div>',
        controller: function($rootScope, $scope, ParamTransmit) {
            var lottery = ParamTransmit.getParam();
            $scope.lottery_code = lottery.lottery_code;
            $rootScope.expect = lottery.expect;
        }
                
    }

})


App.directive('isLocked', function() { // 是否锁定
    return {
        restrict: 'A', 
        replace: true,
        scope: {
            isLocked: '@isLocked', 
        },
        template: '<div>'+
                    '<span ng-if="isLocked == 1" style="color: red;">已锁定</span>'+
                    '<span ng-if="isLocked == 0" style="color: green;">正常</span>'+
                  '</div>'
    }
})



App.directive('categoryType', function() { // 分类类型
    return {
        restrict: 'A', 
        replace: true,
        scope: {
            categoryType: '@categoryType', 
        },
        template: '<div>'+
                    '<span ng-if="categoryType == 2">文章</span>'+
                    '<span ng-if="categoryType == 1">商品</span>'+
                  '</div>'
    }
})



App.directive('datePicker', function() { // 日期控件
    return {
        restrict: 'EA', 
        replace: true,
        scope: {
            month: '=month', 
        },
        templateUrl: 'app/views/partials/data-picker.html',
        controller: function($scope, $rootScope, ParamTransmit) {
            var date = new Date();
            var dpDate = {
                month: date.getMonth(),
                year: date.getFullYear(),
            }

            var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            // 判断是否为闰年，并返回该月天数
            var isLeapYear = function(y, m) {
                if(m < 0) { m = 11; }
                if(m > 11) { m = 0; }
                if(m == 1) { return ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) ? 29 : 28; }
                else { return monthDays[m]; }
            }
            
            var showDate = function() { // 输入框中展示时间
                if(dpDate.month + 1 < 10) {
                    $scope.month = dpDate.year + ' - ' + '0' + parseInt(dpDate.month + 1);
                    var dateOfDay = (dpDate.year).toString() + '0' + (parseInt(dpDate.month + 1)).toString();
                }else {
                    $scope.month = dpDate.year + ' - ' + parseInt(dpDate.month + 1);
                    var dateOfDay = (dpDate.year).toString() + (parseInt(dpDate.month + 1)).toString();
                }

                var numOfDay = new Array();
                var days = isLeapYear(dpDate.year, dpDate.month);
                for(var i = 0; i < days; i++) {
                    numOfDay.push({isEdit: false, is_grand_prix: false, prize_coupon: 0, prize_score: 0, prize_lottery: 0});
                }
                var expect = dateOfDay;
                ParamTransmit.setParam({numOfDay, expect});
            };

            showDate();

            $scope.preMonth = function() {
                dpDate.month--;
                if(dpDate.month < 0) {
                    dpDate.month = 11;
                    dpDate.year--;
                }
                showDate();
                $rootScope.getCheckInsDate();
            };
            
            $scope.nextMonth = function() {
                dpDate.month++;
                if(dpDate.month > 11) {
                    dpDate.month = 0;
                    dpDate.year++;
                }
                showDate();
                $rootScope.getCheckInsDate();
            };

        }
    }
})


App.directive('numSelect', function() { // 数量选择器
    return {
        restrict: 'A', 
        replace: true,
        scope: {
            num: '=num'
        },
        template: '<ul class="numSelect clearfix">'+
                    '<li>'+
                        '<button class="btn btn-default" ng-click="changeNum(0)">-</button>'+
                    '</li>'+
                    '<li><input type="text" ng-model="num" ng-pattern="/^[0-9]{0,6}$/"></li>'+
                    '<li>'+
                        '<button class="btn btn-default" ng-click="changeNum(1)">+</button>'+
                    '</li>'+
                '</ul>',
        controller: function($scope) {
            $scope.changeNum = function(t) {
                t ? $scope.num += 1 : $scope.num -= 1;
            }
        }

    }
        
})



App.directive('contenteditable', function() { // 集成wangEditor
    return {
        restrict: 'A' ,
        require: '?ngModel',
        scope: {
            url: '@url'
        },
        link: function(scope, element, attrs, ngModel) {
            if (!ngModel) return;
            ngModel.$render = function() {
                element.html(ngModel.$viewValue || '');
            };
            element.on('blur keyup mouseout mouseup change', function() {
                scope.$apply(readViewText);
            });
            
            function readViewText() {
                var html = element.html();
                if (attrs.stripBr && html === '<br>') {
                    html = '';
                }
                ngModel.$setViewValue(html);
            }

            // 创建编辑器
            wangEditor.config.printLog = false;
            var editor = new wangEditor(element);

            // 移除插入代码和全屏功能与地图功能
            editor.config.menus = $.map(wangEditor.config.menus, function(item, key) { 
                if (item === 'insertcode') return null;
                if (item === 'fullscreen') return null; 
                if (item === 'location') return null; 
                return item;
            });
            
            editor.config.uploadImgUrl = scope.url + 'gd/upload';
            editor.config.pasteText = true // 只粘贴纯文本

            editor.create();

        }
    };
});




// 封装http请求
App.factory('ConnectApi', function($rootScope, $http) {

   return {
      start: function(method, url, param) {
          if(method === 'post') {
              _http = $http.post(''+ $rootScope.rootUrl + url +'', param);
          }else if(method === 'get') {
              _http = $http.get(''+ $rootScope.rootUrl + url +'', param);
          }else {
              console.log('连接方式传入错误！');
          }
          return _http;
      },

      data: function(res) {
          if ( res.data.code != 200 ) {
              console.log(res.data.msg);
          }
          return res.data;
      }
    
   }
   
});




App.filter('timeFilter', function() { // 日期格式化

    //获取相对日期
    function GetRelativeDate(timestampstr) {
        var timestamp = parseInt(timestampstr);
        timestamp = isNaN(timestamp) ? 0 : timestamp;
        var thenT = new Date(timestamp);
        thenT.setHours(0);
        thenT.setMinutes(0);
        thenT.setSeconds(0);
        var nowtime = new Date();
        nowtime.setHours(0);
        nowtime.setMinutes(0);
        nowtime.setSeconds(0);
        var delt = Math.round((nowtime.getTime() - thenT.getTime()) / 1000 / 86400);
        var day_def = {
            '-3': '大后天',
            '-2': '后天',
            '-1': '明天',
            '0': '今天',
            '1': '昨天',
            '2': '前天',
            '3': '上前天'
        }[delt.toString()] || ((delt >= -30 && delt < 0) ? Math.abs(delt) + '天后' : (delt > 0 && delt <= 30) ? delt + '天前' : GetDateString(timestamp));
        return day_def;
    }

    function GetDateString(timestampstr, split) {
        var timestamp = parseInt(timestampstr);
        timestamp = isNaN(timestamp) ? 0 : timestamp;
        var datetime = new Date(timestamp);
        var month = datetime.getMonth() + 1;
        var date = datetime.getDate();
        if (split === undefined) split = '-';
        return datetime.getFullYear() + split + (month > 9 ? month : "0" + month) + split + (date > 9 ? date : "0" + date);
    }
    
    return function(time) {
        var week = new Date(parseInt(time) * 1000).getDay();
        var hours = new Date(parseInt(time) * 1000).getHours();
        var minutes = new Date(parseInt(time) * 1000).getMinutes();

        if(hours < 10 && minutes < 10) {
            var t = '0' + hours + ':0' + minutes;
        }else if(hours < 10 && minutes > 9) {
            var t = '0' + hours + ':' + minutes;
        }else if(hours > 9 && minutes < 10) {
            var t = hours + ':0' + minutes;
        }else {
            var t = hours + ':' + minutes;
        }

        switch(week) {
            case 1:
                return '周一（'+GetRelativeDate(time * 1000)+' '+ t +'）';
            case 2:
                return '周二（'+GetRelativeDate(time * 1000)+' '+ t +'）';
            case 3:
                return '周三（'+GetRelativeDate(time * 1000)+' '+ t +'）';
            case 4:
                return '周四（'+GetRelativeDate(time * 1000)+' '+ t +'）';
            case 5:
                return '周五（'+GetRelativeDate(time * 1000)+' '+ t +'）';
            case 6:
                return '周六（'+GetRelativeDate(time * 1000)+' '+ t +'）';
            case 0:
                return '周日（'+GetRelativeDate(time * 1000)+' '+ t +'）';
        }
    };
})




App.filter('to_trusted', ['$sce', function ($sce) { // html代码格式化
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);




// 参数传递
App.factory('ParamTransmit', function($parse, $state) {

   var saveParam = function(param) {
       sessionStorage.setItem('paramSession', JSON.stringify(param));
   }
   
   var judgeOldParam = function(oldParam, param) { // 判断是否有新的token传入

       if(!param.token) {
           if(oldParam.token) {
               param.token = oldParam.token;
           }else {
               console.log('token不存在，请手动设置token之后再调用setParam。');
               alert('token丢失，即将跳转到登陆页面！');
               $state.go('page.login');
           }
       }
       saveParam(param);
   }
   
   var paramJson = function() {
       return JSON.parse(sessionStorage.paramSession);
   }

   return {
       
      setParam: function(param) {
         try {
            var oldParam = paramJson();
         } catch(err) {
            console.log('首次设置paramSession成功！');
            var oldParam = false;
         }
         judgeOldParam(oldParam, param);
         return paramJson();
      },


      getParam: function() { return paramJson(); },

      removeParam: function(key) {
         var param = paramJson();
         var delExpr = 'delete param.' + key;
         eval(delExpr);
         sessionStorage.setItem('paramSession', JSON.stringify(param));
         return paramJson();
      },

      clearParam: function() { sessionStorage.removeItem('paramSession'); }

   }
   
});




// 登录

App.controller('LoginController', ["$scope", 'ConnectApi', '$state', 'ParamTransmit', function($scope, ConnectApi, $state, ParamTransmit) {

    $scope.param = {
      username: 'admin',
      password: 'admin'
    }
    
    ParamTransmit.clearParam();

    $scope.go = function() {
      ConnectApi.start('post', 'public/login', $scope.param).then(function(response) {
          var data = ConnectApi.data(response);
          $scope.data = data.data;
          if($scope.data) {
            var token = $scope.data.token
            ParamTransmit.setParam({ token });
            $state.go('app.homePage');
          }
      });
    }
  
}]);



// 开奖公告 

App.controller('LotteryNoticeController', ["$scope", 'ConnectApi', '$state', 'ParamTransmit', function($scope, ConnectApi, $state, ParamTransmit) {

    $scope.param = ParamTransmit.getParam();

    ConnectApi.start('post', 'lottery/newest_record', $scope.param).then(function(response) {
        var data = ConnectApi.data(response);
        $scope.data = data.data;
    });

    $scope.lotteryDetails = function(lottery_code, expect) {
        ParamTransmit.setParam({ lottery_code, expect });
    }

    $scope.goLotteryHistory = function(lottery_code) {
        ParamTransmit.setParam({ lottery_code });
    }

}]);




// 开奖详情

App.controller('LotteryDetailsController', ["$scope", 'ConnectApi', '$state', 'ParamTransmit', function($scope, ConnectApi, $state, ParamTransmit) {

    $scope.param = ParamTransmit.getParam();

    $scope.isHaveData = true;
    ConnectApi.start('post', 'lottery/lottery_results', $scope.param).then(function(response) {
        var data = ConnectApi.data(response);
        $scope.data = data.data;
    });

}]);




// 分类管理

App.controller('CategoryController', ["$scope", '$sce', 'ConnectApi', '$state', 'ParamTransmit', function($scope, $sce, ConnectApi, $state, ParamTransmit) {

    $scope.param = ParamTransmit.getParam();

    $scope.treeOptions = {
        nodeChildren: "cateChild",
        dirSelectable: true,
        injectClasses: {
            ul: "a1",
            li: "a2",
            liSelected: "a7",
            iExpanded: "a3",
            iCollapsed: "a4",
            iLeaf: "a5",
            label: "a6",
            labelSelected: "a8"
        }
    }

    ConnectApi.start('post', 'category/index', $scope.param).then(function(response) {
        var data = ConnectApi.data(response);
        $scope.data = data.data;
        $scope.dataForTheTree = $scope.data;
    });


}]);




// 用户列表

App.controller('UsersListController', ["$scope", 'ConnectApi', '$state', 'ParamTransmit', function($scope, ConnectApi, $state, ParamTransmit) {

    $scope.param = ParamTransmit.getParam();
    $scope.param.p = 0;
    
    ConnectApi.start('post', 'member/index', $scope.param).then(function(response) {
        var data = ConnectApi.data(response);
        $scope.data = data.data.mod_data;
    });
  
}]);





// 中奖用户

App.controller('WinningUserController', ["$scope", 'ConnectApi', '$state', 'ParamTransmit', function($scope, ConnectApi, $state, ParamTransmit) {

    // p 分页
    // lottery_code 彩票代码
    // expect 期数
    // status ==2为中奖用户，不填为全部购彩用户
    
    $scope.param = ParamTransmit.getParam();
    $scope.param.p = 0;
    $scope.param.status = 2;

    ConnectApi.start('post', 'lottery/lottery_order', $scope.param).then(function(response) {
        var data = ConnectApi.data(response);
        $scope.data = data.data.mod_data;
    });
  
}]);



// 彩票列表

App.controller('LotteryListController', ["$scope", 'ConnectApi', '$state', 'ParamTransmit', function($scope, ConnectApi, $state, ParamTransmit) {

    $scope.goLotteryHistory = function(lottery_code) {
        ParamTransmit.setParam({ lottery_code });
    }
  
}]);



// 彩票历史

App.controller('LotteryHistoryController', ["$scope", 'ConnectApi', '$state', 'ParamTransmit', function($scope, ConnectApi, $state, ParamTransmit) {

    $scope.param = ParamTransmit.getParam();
    $scope.param.p = 0;

    ConnectApi.start('post', 'lottery/lottery_record', $scope.param).then(function(response) {
        var data = ConnectApi.data(response);
        $scope.data = data.data.mod_data;
    });

}]);




// 广告管理

App.controller('AdController', ["$scope", '$sce', 'ConnectApi', '$state', 'ParamTransmit', function($scope, $sce, ConnectApi, $state, ParamTransmit) {

    $scope.param = ParamTransmit.getParam();
    $scope.param.p = 0;
    
    ConnectApi.start('post', 'admeta/index', $scope.param).then(function(response) {
        var data = ConnectApi.data(response);
        $scope.data = data.data;
    });


}]);



// 签到配置

App.controller('CheckInsController', ["$scope", '$rootScope', '$sce', 'ConnectApi', '$state', 'ParamTransmit', '$timeout', function($scope, $rootScope, $sce, ConnectApi, $state, ParamTransmit, $timeout) {

    $rootScope.getCheckInsDate = function() {

        $scope.param = ParamTransmit.getParam();

        ConnectApi.start('post', 'plugins/get_sign_reward', $scope.param).then(function(response) {
            var data = ConnectApi.data(response);
            $scope.data = data.data;
            for(var i = 0; i < $scope.data.length; i++) {

                var pc = parseInt($scope.data[i].prize_coupon);
                var ps = parseInt($scope.data[i].prize_score);
                var pl = parseInt($scope.data[i].prize_lottery);
                
                $scope.data[i].prize_coupon = pc ? pc : 0;
                $scope.data[i].prize_score = ps ? ps : 0;
                $scope.data[i].prize_lottery = pl ? pl : 0;

                $scope.param.numOfDay[$scope.data[i].frequency - 1] = $scope.data[i];
                if($scope.data[i].is_grand_prix == 1 ) {
                    $scope.param.numOfDay[$scope.data[i].frequency - 1].is_grand_prix = true;
                }
                if($scope.data[i].is_grand_prix == 0) {
                    $scope.param.numOfDay[$scope.data[i].frequency - 1].is_grand_prix = false;
                }

            }

            $scope.showEdit = function(_index, isEdit) {
                var spDate = $scope.param.numOfDay[_index];
                if(isEdit) {
                    $scope.sp = {
                        frequency: _index + 1,
                        expect: $scope.param.expect,
                        is_grand_prix: spDate.is_grand_prix ? 1 : 0,
                        prize_score: spDate.prize_score ? spDate.prize_score : null,
                        prize_coupon: spDate.prize_coupon ? spDate.prize_coupon : null,
                        prize_lottery: spDate.prize_lottery ? spDate.prize_lottery : null
                    };
                    var reward = new Array;
                    reward.push($scope.sp);
                    $scope.param.reward = reward;
                    
                    ConnectApi.start('post', 'plugins/set_sign_reward', $scope.param).then(function(response) {
                        $rootScope.getCheckInsDate();
                    });
                }

                spDate.isEdit = !isEdit;
            }

        });
    }

    $timeout(function() {
        $rootScope.getCheckInsDate();
    }, 200);

    $rootScope.reset = function() {
        var reward = new Array;
        for(var i = 0; i < $scope.param.numOfDay.length; i++) {
            reward.push($scope.param.numOfDay[i] = {
                frequency: i + 1,
                expect: $scope.param.expect,
                is_grand_prix: 0,
                prize_score: null,
                prize_coupon: null,
                prize_lottery: null
            });
        }

        $scope.param.reward = reward;
        
        ConnectApi.start('post', 'plugins/set_sign_reward', $scope.param).then(function(response) {
            $rootScope.getCheckInsDate();
        });
        
    }
    
}]);



// 设置彩票详情
App.controller('setLotteryController', ["$scope", '$sce', 'ConnectApi', '$state', 'ParamTransmit', function($scope, $sce, ConnectApi, $state, ParamTransmit) {

    $scope.param = ParamTransmit.getParam();

    var getLotterySet = function() {
        ConnectApi.start('post', 'lottery/lottery_rule', $scope.param).then(function(response) {
            var data = ConnectApi.data(response);
            $scope.data = data.data;
            switch($scope.data.is_open) {
                case 0:
                    $scope.data.is_open = true;
                    break;
                case 1: 
                    $scope.data.is_open = false;
                    break;
            }
        });
    }
    
    getLotterySet();
    
    $scope.isEdit = false;

    $scope.showEdit = function() {
        if($scope.isEdit) {
            $scope.param.stop_buying_time = $scope.data.stop_buying_time;
            $scope.param.lottery_time_explain = $scope.data.lottery_time_explain;
            $scope.param.is_open = $scope.data.is_open ? 0 : 1;
            ConnectApi.start('post', 'lottery/lottery_save', $scope.param).then(function(response) {
                getLotterySet();
            });
        }
        
        $scope.isEdit = !$scope.isEdit;
    }

}]);



// 文章列表
App.controller('ArticleController', ["$scope", '$sce', 'ConnectApi', '$state', 'ParamTransmit', function($scope, $sce, ConnectApi, $state, ParamTransmit) {


    // 0 新增
    // 1 修改
    // 2 查看
    // 3 删除

    $scope.param = ParamTransmit.getParam();

    var getFaqList = function() {
        ConnectApi.start('post', 'faq/index', $scope.param).then(function(response) {
            var data = ConnectApi.data(response);
            $scope.data = data.data.mod_data;
        });
    }
    
    getFaqList();

    $scope.article = function(act, id) {
        var actionType = act;
        var cat_id = id, faq_id = id;
        switch(act) {
            case 0:
                ParamTransmit.setParam({ cat_id, actionType });
                $state.go('app.addArticle');
                break;
            case 1: 
                ParamTransmit.setParam({ faq_id, actionType });
                $state.go('app.addArticle');
                break;
            case 2: 
                ParamTransmit.setParam({ faq_id, actionType });
                $state.go('app.addArticle');
                break;
            case 3: 
                $scope.param = { faq_id };
                ConnectApi.start('post', 'faq/del', $scope.param).then(function(response) {
                    var data = ConnectApi.data(response);
                    $scope.data = data.data;
                    getFaqList();
                });
                break;

        }
    }
    

}]);


// 文章管理
App.controller('AddArticleController', ["$scope", '$rootScope', '$sce', 'ConnectApi', '$state', 'ParamTransmit', 'FileUploader', function($scope, $rootScope, $sce, ConnectApi, $state, ParamTransmit, FileUploader) {

    $scope.param = ParamTransmit.getParam();

    var uploader = $scope.uploader = new FileUploader({
        url: ''+ $rootScope.rootUrl +'gd/upload'
    })

    uploader.onSuccessItem = function(response) {
        $scope.pvwImg = response._xhr.response;
    };

    var isEditOrNew = function() { // 不管是在新增还是编辑状态 都启用这个方法

        $scope.param.title = $scope.title;
        $scope.param.content = $scope.content;
        $scope.param.summary = $scope.content.replace(/<[^>]*>|/g,"").substr(0, 100);
        $scope.param.img = $scope.pvwImg;
        return $scope.param;
    }

    var getFaqDetails = function() { // 获取文章详情
        ConnectApi.start('post', 'faq/getfaq', $scope.param).then(function(response) {
            var data = ConnectApi.data(response);
            $scope.data = data.data;
            $scope.title = $scope.data.title;
            $scope.content = $scope.data.content;
            $scope.pvwImg = $scope.data.img;
        });
    }


    switch($scope.param.actionType) {
        case 0:
            $scope.save = function() {
                isEditOrNew();
                ConnectApi.start('post', 'faq/add', $scope.param).then(function(response) {
                    var data = ConnectApi.data(response);
                    $scope.data = data.data;
                    $state.go('app.news');
                });
            }
            break;
        case 1: 
            getFaqDetails();
            $scope.save = function() {
                isEditOrNew();
                ConnectApi.start('post', 'faq/edit', $scope.param).then(function(response) {
                    var data = ConnectApi.data(response);
                    $scope.data = data.data;
                    $state.go('app.news');
                });
            }
            break;
        case 2: 
            getFaqDetails();
            break;
    }


}]);

