import {Routes} from '@angular/router';

export const BootstrapTableRoutes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Tables',
      status: false
    },
    children: [
      {
        path: 'basic-bootstrap',
        loadChildren: './basic-bootstrap/basic-bootstrap.module#BasicBootstrapModule'
      }, {
        path: 'sizing',
        loadChildren: './sizing/sizing.module#SizingModule'
      }, {
        path: 'border',
        loadChildren: './border/border.module#BorderModule'
      }, {
        path: 'styling',
        loadChildren: './styling/styling.module#StylingModule'
      }
    ]
  }
]
