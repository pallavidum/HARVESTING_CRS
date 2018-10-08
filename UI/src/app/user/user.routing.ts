import {Routes} from '@angular/router';

export const UserRoutes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'User Profile',
      status: false
    },
    children: [
      {
        path: 'profile',
        loadChildren: './profile/profile.module#ProfileModule'
      }, {
        path: 'card',
        loadChildren: './card/card.module#CardModule'
      }
    ]
  }
]
