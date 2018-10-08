import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSet } from '../shared/configure-model';
import { Model } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: []
})
export class ModelDeployModule {
  loadModelDetail(modelDetail){
    console.log(modelDetail);
  }  
 }



interface ModelDetail{
  dataset : DataSet,
  configModel : Model;
}