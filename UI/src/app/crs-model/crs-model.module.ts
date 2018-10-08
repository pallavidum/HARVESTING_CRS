import { NgModule, Injectable, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrsModelComponent } from 'app/crs-model/crs-model.component';
import { RouterModule } from '@angular/router';
import { WizardService } from '../components/wizard/wizard.service';
import { CreateModelComponent } from './create-model/create-model.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigureModelService } from './shared/configure-model.service';
import { ModelListComponent } from './model-list/model-list.component';
import { ModelDeployComponent } from './model-deploy/model-deploy.component';
import { TdpComponent } from '../tdp/tdp.component';
import { TdpModule } from '../tdp/tdp.module';
import { IndexedDBService } from './shared/indexedDB.service';
import { ConfigureModel } from './shared/configure-model';

@NgModule({
  imports: [
    TdpModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: CrsModelComponent,
      children: [
        {
          path: '',
          redirectTo: 'model',
          pathMatch: 'full'
        },
        {
          path: 'create',
          component: CreateModelComponent
        }, {
          path: 'create/:id',
          component: CreateModelComponent
        }, {
          path: 'features',
          loadChildren: './features/features.module#FeaturesModule'
        },{
          path: 'features/:id',
          loadChildren: './features/features.module#FeaturesModule'
        },
        {
          path: 'select-algorithm',
          loadChildren: './select-algorithm/select-algorithm.module#SelectAlgorithmModule'
        },
        {
          path: 'model',
          loadChildren: './model/model.module#ModelModule'
        }, {
          path: 'partition',
          loadChildren: './partition-dataset/partition-dataset.module#PartitionDatasetModule'
        }, {
          path: 'partition/:id',
          loadChildren: './partition-dataset/partition-dataset.module#PartitionDatasetModule'
        }, {
          path: 'perform',
          loadChildren: './model-performance/model-performance.module#ModelPerformanceModule'
        }, {
          path: 'apply',
          loadChildren: './apply-score/apply-score.module#ApplyScoreModule'
        },
        {
          path:'model-list',
          loadChildren: './model-list/model-list.module#ModelListModule'
        },
        {
          path:'model-deploy',
          component:ModelDeployComponent
          //loadChildren: './model-deploy/model-deploy.module#ModelDeployModule'
        },
        {
          path:'tdp/:id/:score',
          component:TdpComponent
          //loadChildren: './model-deploy/model-deploy.module#ModelDeployModule'
        }
      ],
    }]),
  ],
  declarations: [CrsModelComponent, CreateModelComponent, ModelDeployComponent],
  providers: [ConfigureModelService,IndexedDBService ,WizardService]
})
export class CrsModelModule { }
