# dex-tab
AngularJS Tabs Directive Using NG-IF to display tab contents


Tested with AngularJS 1.3.11, angular-bootstrap 0.13.1 and bootstrap 3.3.0

# Usage
1. Download the .js file
2. Include the "dex-tab" module into your project

Example html use:

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


 Use default for button-like tabs.
 Use custom="true" for bootstrap-like tabs

 VERTICAL AND JUSTIFIED WORKS ONLY WITH custom="true" attribute
