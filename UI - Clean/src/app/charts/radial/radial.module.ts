import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RadialComponent} from './radial.component';
import {SharedModule} from '../../shared/shared.module';

export const radialRoutes: Routes = [
  {
    path: '',
    component: RadialComponent,
    data: {
      breadcrumb: 'Radial Chart',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(radialRoutes),
    SharedModule
  ],
  declarations: [RadialComponent]
})
export class RadialModule { }
