import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {VectorComponent} from './vector.component';
import {SharedModule} from '../../shared/shared.module';

export const vectorRoutes: Routes = [
  {
    path: '',
    component: VectorComponent,
    data: {
      breadcrumb: 'Vector Map',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(vectorRoutes),
    SharedModule
  ],
  declarations: [VectorComponent]
})
export class VectorModule { }
