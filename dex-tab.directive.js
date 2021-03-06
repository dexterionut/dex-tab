/**
 * Created by dexterionut on 07/05/2017.

 Usage:

 *Default*
 <dex-tabset>
 <dex-tab heading="Tab 1" icon="fa fa-globe">Tab 1 content</dex-tab>
 <dex-tab heading="Tab 2" icon="fa fa-send">Tab 2 content</dex-tab>
 </dex-tabset>

 *Vertical pills*
 <dex-tabset custom="true" type="pills" vertical="true">
 <dex-tab heading="Tab 1" icon="fa fa-globe">Tab 1 content</dex-tab>
 <dex-tab heading="Tab 2" icon="fa fa-send">Tab 2 content</dex-tab>
 </dex-tabset>


 Use default for buttons like tabs.
 Use custom="true" for bootstrap like tabs

 VERTICAL AND JUSTIFIED WORKS ONLY WITH custom="true" attribute


 */



(function () {
    'use strict';

    angular
        .module('dex-tab', []);


    angular
        .module('dex-tab')
        .directive('dexTabset', tabsetDirective);
    function tabsetDirective() {

        return {
            restrict: 'E',
            transclude: true, //used to include html things put in this tag
            scope: {
                type: '@',
                vertical: '@',
                justified: '@',
                custom: '@'
            },
            template: `<div role="tabpanel" ng-class="tabset.panel">
    <div class="row m-b" ng-if="tabset.showDefault">
        <div class="col-md-12">
            <!--If custom="true" attribute is not present-->
            <div class="btn-group" >
                <label class="btn btn-sm btn-default"
                       ng-model="tabset.radioModel" btn-radio="{{tab.id}}"
                       data-ng-repeat="tab in tabset.tabs"
                       ng-click="tabset.select(tab)">
                    <i class="fa text-active"></i><i class="fa {{tab.icon}}"></i> {{tab.heading}}
                </label>
            </div>
        </div>
    </div>


    <!--If custom="true" attribute is present-->
    <ul class="nav" ng-class="tabset.classes" ng-if="tabset.showCustom" role="tablist">
        <li role="presentation"
            ng-repeat="tab in tabset.tabs"
            ng-class="{'active': tab.active}">

            <a href
               role="tab"
               ng-click="tabset.select(tab)"> <i class="m-r-xs fa {{tab.icon}}"></i> {{tab.heading}}
            </a>
        </li>
    </ul>

    <ng-transclude ng-class="tabset.content">
    </ng-transclude>
</div>`,
            bindToController: true,
            controller: 'DexTabsetController',
            controllerAs: 'tabset'
        }
    }

    angular
        .module('dex-tab')
        .controller('DexTabsetController', Controller);
    function Controller() {

        //Variables
        var vm = this;
        vm.tabs = []; //tabs
        vm.classes = {}; //tabset classes
        vm.panel = {};
        vm.content = {};
        vm.radioModel = undefined;

        //Used for tabset classes

        //custom styling with buttons
        if (vm.custom !== 'true')
            vm.showDefault = true;
        //bootstrap styling with nav
        else {
            vm.showCustom = true;
            if (vm.type === 'pills') {
                vm.classes['nav-pills'] = true //pills(button like)
            } else {
                vm.classes['nav-tabs'] = true //tabs
            }
            if (vm.justified && !vm.vertical) {
                vm.classes['nav-justified'] = true //inline no next line
            }
            if (vm.vertical) {
                vm.classes['nav-stacked'] = true; //verical tabs
                vm.panel['row'] = true;
                vm.classes['col-md-4'] = true;
                vm.content['col-md-8'] = true;
            }
        }

        //Functions
        vm.addTab = addTab;
        vm.select = select;

        function addTab(tab) {
            tab.id = vm.tabs.length + 1;
            vm.tabs.push(tab);

            if (vm.tabs.length === 1) {
                tab.active = true;
                vm.radioModel = 1;
            }
        }

        function select(selectedTab) {
            angular.forEach(vm.tabs, function (tab) {
                if (tab.active && tab !== selectedTab) {
                    tab.active = false;
                }
            });
            selectedTab.active = true;
            vm.radioModel = selectedTab.id;
        }

    }


    angular
        .module('dex-tab')
        .directive('dexTab', tabDirective);
    function tabDirective() {

        return {
            restrict: 'E',
            transclude: true, //used to include html things put in this tag
            template: '<div role="tabpanel" ng-if="active" ng-transclude></div>',
            require: '^dexTabset',
            scope: {
                heading: '@',
                icon: '@'
            },
            link: function (scope, elem, attr, tabsetCtrl) {
                scope.active = false;
                tabsetCtrl.addTab(scope);
            }
        }
    }
})();
