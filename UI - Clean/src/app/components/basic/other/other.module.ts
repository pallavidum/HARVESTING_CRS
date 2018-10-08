import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {OtherComponent} from './other.component';
import {SharedModule} from '../../../shared/shared.module';

export const OtherRoutes: Routes = [
  {
    path: '',
    component: OtherComponent,
    data: {
      breadcrumb: 'Other',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(OtherRoutes),
    SharedModule
  ],
  declarations: [OtherComponent]
})
export class OtherModule { }
