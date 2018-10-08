import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModelPerformanceComponent } from 'app/crs-model/model-performance/model-performance.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: ModelPerformanceComponent
    }])
  ],
  declarations: [ModelPerformanceComponent]
})
export class ModelPerformanceModule { }
