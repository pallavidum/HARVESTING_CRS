import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table.component';
import {RouterModule} from '@angular/router';
import {DataTableRoutes} from './data-table.routing';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DataTableRoutes),
    SharedModule
  ],
  declarations: [DataTableComponent]
})
export class DataTableModule { }
