import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MorrisJsComponent} from './morris-js.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';

export const morrisJsRoutes: Routes = [
  {
    path: '',
    component: MorrisJsComponent,
    data: {
      breadcrumb: 'MorrisJS Chart',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(morrisJsRoutes),
    SharedModule
  ],
  declarations: [MorrisJsComponent]
})
export class MorrisJsModule { }
