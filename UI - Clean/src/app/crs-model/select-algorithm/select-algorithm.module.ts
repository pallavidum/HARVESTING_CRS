import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SelectAlgorithmComponent } from './select-algorithm.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: SelectAlgorithmComponent
      }
      ])
  ],
  declarations: [SelectAlgorithmComponent]
})
export class SelectAlgorithmModule { }
