import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BasicElementsComponent} from './basic-elements.component';
import {SharedModule} from '../../../shared/shared.module';

export const basicElementRoutes: Routes = [
  {
    path: '',
    component: BasicElementsComponent,
    data: {
      breadcrumb: 'Form Components',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(basicElementRoutes),
    SharedModule
  ],
  declarations: [BasicElementsComponent]
})
export class BasicElementsModule { }
