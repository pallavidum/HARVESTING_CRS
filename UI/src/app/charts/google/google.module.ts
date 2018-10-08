import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {GoogleComponent} from './google.component';
import {SharedModule} from '../../shared/shared.module';

export const googleRoutes: Routes = [
  {
    path: '',
    component: GoogleComponent,
    data: {
      breadcrumb: 'Google Chart',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(googleRoutes),
    SharedModule
  ],
  declarations: [GoogleComponent]
})
export class GoogleModule { }
