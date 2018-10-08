import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FroalaEditComponent} from './froala-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';

export const froalaRoutes: Routes = [
  {
    path: '',
    component: FroalaEditComponent,
    data: {
      breadcrumb: 'Froala WYSIWYG Editor',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(froalaRoutes),
    SharedModule
  ],
  declarations: [FroalaEditComponent]
})
export class FroalaEditModule { }
