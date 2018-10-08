import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../../shared/shared.module';
import {PagingComponent} from './paging.component';

export const pagingRoutes: Routes = [
  {
    path: '',
    component: PagingComponent,
    data: {
      breadcrumb: 'Table Paging',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(pagingRoutes),
    SharedModule
  ],
  declarations: [PagingComponent]
})
export class PagingModule { }
