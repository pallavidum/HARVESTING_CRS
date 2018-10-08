import {Routes} from '@angular/router';

export const AdvanceRoutes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Advance Components',
      status: false
    },
    children: [
      {
        path: 'modal',
        loadChildren: './modal/modal.module#ModalModule'
      }, {
        path: 'notifications',
        loadChildren: './notifications/notifications.module#NotificationsModule'
      }, {
        path: 'notify',
        loadChildren: './notify/notify.module#NotifyModule'
      }
    ]
  }
];
