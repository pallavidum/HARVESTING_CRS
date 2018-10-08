import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModelComponent } from './model.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ModelComponent
      }
      ])
  ],
  declarations: [ModelComponent]
})
export class ModelModule { }
