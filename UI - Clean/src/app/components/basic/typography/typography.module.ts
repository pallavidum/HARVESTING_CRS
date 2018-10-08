import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {TypographyComponent} from './typography.component';

export const TypographyRoutes: Routes = [
  {
    path: '',
    component: TypographyComponent,
    data: {
      breadcrumb: 'Typography',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TypographyRoutes),
    SharedModule
  ],
  declarations: [TypographyComponent]
})
export class TypographyModule { }
