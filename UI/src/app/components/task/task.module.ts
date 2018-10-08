import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import {RouterModule} from '@angular/router';
import {TaskRoutes} from './task.routing';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TaskRoutes),
    SharedModule
  ],
  declarations: [TaskComponent]
})
export class TaskModule { }
