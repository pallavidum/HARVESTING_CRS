import {Routes} from '@angular/router';

export const BasicRoutes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Basic Components',
      status: false
    },
    children: [
      {
        path: 'alert',
        loadChildren: './alert/alert.module#AlertModule'
      }, {
        path: 'breadcrumb',
        loadChildren: './breadcrumb/breadcrumb.module#BreadcrumbModule'
      }, {
        path: 'button',
        loadChildren: './button/button.module#ButtonModule'
      }, {
        path: 'accordion',
        loadChildren: './accordion/accordion.module#AccordionModule'
      }, {
        path: 'generic-class',
        loadChildren: './generic-class/generic-class.module#GenericClassModule'
      }, {
        path: 'tabs',
        loadChildren: './tabs/tabs.module#TabsModule'
      }, {
        path: 'label-badge',
        loadChildren: './label-badge/label-badge.module#LabelBadgeModule'
      }, {
        path: 'typography',
        loadChildren: './typography/typography.module#TypographyModule'
      }, {
        path: 'other',
        loadChildren: './other/other.module#OtherModule'
      }
    ]
  }
];
