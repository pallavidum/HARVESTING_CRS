import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../../shared/shared.module';
import {OtherComponent} from './other.component';

export const otherRoutes: Routes = [
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
    RouterModule.forChild(otherRoutes),
    SharedModule
  ],
  declarations: [OtherComponent]
})
export class OtherModuleDataTable { }
