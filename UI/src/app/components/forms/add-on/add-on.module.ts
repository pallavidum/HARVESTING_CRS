import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {AddOnComponent} from './add-on.component';

export const addOnRoutes: Routes = [
  {
    path: '',
    component: AddOnComponent,
    data: {
      breadcrumb: 'Form Elements Add-On',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(addOnRoutes),
    SharedModule
  ],
  declarations: [AddOnComponent]
})
export class AddOnModule { }
