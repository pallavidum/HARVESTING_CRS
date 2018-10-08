import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../../shared/shared.module';
import {SelectionComponent} from './selection.component';
import {CellComponent} from './cell/cell.component';
import {CheckboxComponent} from './checkbox/checkbox.component';
import {MultiRowsComponent} from './multi-rows/multi-rows.component';
import {SingleRowComponent} from './single-row/single-row.component';

export const selectionRoutes: Routes = [
  {
    path: '',
    component: SelectionComponent,
    data: {
      breadcrumb: 'Selection Table',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(selectionRoutes),
    SharedModule
  ],
  declarations: [SelectionComponent, CellComponent, CheckboxComponent, MultiRowsComponent, SingleRowComponent]
})
export class SelectionModule { }
