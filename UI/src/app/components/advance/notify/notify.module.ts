import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {NotifyComponent} from './notify.component';

export const notifyRoutes: Routes = [
  {
    path: '',
    component: NotifyComponent,
    data: {
      breadcrumb: 'PNOTIFY',
      status: true
    }
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(notifyRoutes),
    SharedModule
  ],
  declarations: [NotifyComponent]
})
export class NotifyModule { }
