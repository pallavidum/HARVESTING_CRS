import {Routes} from '@angular/router';

export const MapRoutes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Map',
      status: false
    },
    children: [
      {
        path: 'google',
        loadChildren: './google/google.module#GoogleModuleMap'
      }, {
        path: 'vector',
        loadChildren: './vector/vector.module#VectorModule'
      }
    ]
  }
]
