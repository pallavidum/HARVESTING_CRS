import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccordionComponent} from './accordion.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';

export const AccordionRoutes: Routes = [
  {
    path: '',
    component: AccordionComponent,
    data: {
      breadcrumb: 'Accordion',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AccordionRoutes),
    SharedModule
  ],
  declarations: [AccordionComponent]
})
export class AccordionModule { }
