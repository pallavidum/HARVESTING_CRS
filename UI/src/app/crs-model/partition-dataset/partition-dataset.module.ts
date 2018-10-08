import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartitionDatasetComponent } from './partition-dataset.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: PartitionDatasetComponent
    }])
  ],
  declarations: [PartitionDatasetComponent],
  exports: [PartitionDatasetComponent]
})
export class PartitionDatasetModule { }
