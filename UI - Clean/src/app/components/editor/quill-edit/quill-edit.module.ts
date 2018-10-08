import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuillEditComponent} from './quill-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';

export const quillRoutes: Routes = [
  {
    path: '',
    component: QuillEditComponent,
    data: {
      breadcrumb: 'Quill Editor',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(quillRoutes),
    SharedModule
  ],
  declarations: [QuillEditComponent]
})
export class QuillEditModule { }
