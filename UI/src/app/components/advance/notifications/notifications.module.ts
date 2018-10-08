import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NotificationsComponent} from './notifications.component';
import {SharedModule} from '../../../shared/shared.module';

export const notificationsRoutes: Routes = [
  {
    path: '',
    component: NotificationsComponent,
    data: {
      breadcrumb: 'Notifications',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(notificationsRoutes),
    SharedModule
  ],
  declarations: [NotificationsComponent]
})
export class NotificationsModule { }
