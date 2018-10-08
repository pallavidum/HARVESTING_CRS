import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ModalComponent} from './modal.component';
import {SharedModule} from '../../../shared/shared.module';

export const modalRoutes: Routes = [
  {
    path: '',
    component: ModalComponent,
    data: {
      breadcrumb: 'Modal',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(modalRoutes),
    SharedModule
  ],
  declarations: [ModalComponent]
})
export class ModalModule { }
