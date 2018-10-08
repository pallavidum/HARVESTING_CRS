import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

import {BootstrapTableRoutes} from './bootstrap-table.routing';
import { BootstrapTableComponent } from './bootstrap-table.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BootstrapTableRoutes),
    SharedModule
  ],
  declarations: [BootstrapTableComponent]
})
export class BootstrapTableModule { }
