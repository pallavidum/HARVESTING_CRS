import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {PickerComponent} from './picker.component';

export const pickerRoutes: Routes = [
  {
    path: '',
    component: PickerComponent,
    data: {
      breadcrumb: 'Form Picker'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(pickerRoutes),
    SharedModule
  ],
  declarations: [PickerComponent]
})
export class PickerModule { }
