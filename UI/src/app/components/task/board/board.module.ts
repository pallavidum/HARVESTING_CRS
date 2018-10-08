import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BoardComponent} from './board.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';

export const boardRoutes: Routes = [
  {
    path: '',
    component: BoardComponent,
    data: {
      breadcrumb: 'Task Board',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(boardRoutes),
    SharedModule
  ],
  declarations: [BoardComponent]
})
export class BoardModule { }
