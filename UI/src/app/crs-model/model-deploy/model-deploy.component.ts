import { Component, OnInit } from '@angular/core';
import { SelectedModel, ConfigureModel, DataSet, Model, Column } from '../shared/configure-model';
import { ConfigureModelService } from 'app/crs-model/shared/configure-model.service';
import { selectedDataSet, selectModel } from 'app/crs-model/shared/extensions';
import { environment } from 'environments';
import { Router } from '@angular/router';
import { WizardService } from 'app/components/wizard/wizard.service';

@Component({
  selector: 'app-model-deploy',
  templateUrl: './model-deploy.component.html',
  styleUrls: ['./model-deploy.component.css']
})
export class ModelDeployComponent implements OnInit {
  selectedDataSet: DataSet;
  selectedModel: Model;
  modelId: string;
  requestString: string;
  responseString: string;
  endPoint: string = environment.apiHost;
  modelConfiguration: ConfigureModel;
  currentModel: Model;
  activeModelIndex: number;
  selectedDataset: DataSet;
  predictionControls: Column[];
  data: number[];
  score: number;
  constructor(private modelService: ConfigureModelService,private configService: ConfigureModelService,private router: Router,private wizard: WizardService) { }
  
  ngOnInit() {
    this.wizard.activeTab.next(5);
    this.configService.getModelIndex().subscribe((modelIndex: number) => {
      this.activeModelIndex = modelIndex;
      this.modelService.model.subscribe((res: ConfigureModel) => {
        this.modelConfiguration = res;
        this.currentModel = this.activeModelIndex === -1 ? this.modelConfiguration.models.slice(-1)[0]
          : this.modelConfiguration.models[this.activeModelIndex];
        this.modelId = this.currentModel.modelResult.uuid_t;
        let requestObj = {};
        let responseObj = {};
        this.selectedDataset = this.modelConfiguration.dataSets.filter(x => x.isSelected)[0];
        this.predictionControls =
          this.selectedDataset.columns.filter(x => x.name !== this.selectedDataset.predictionColumn);
        this.selectedDataset.columns.forEach((column, ind) => {
          if (column.name !== this.selectedDataset.predictionColumn) {
            requestObj[column.name] = column.defaultValue;
          } else {
            responseObj[column.name] = column.defaultValue;
          }
          if (ind + 1 === this.selectedDataset.columns.length) {
            this.requestString = JSON.stringify(requestObj, null, 4);
            this.responseString = JSON.stringify(responseObj, null, 4);
          }
        });
      });
    });

      // this.modelService.model.subscribe(res => {        
      //   this.modelConfiguration = res;
      //   console.log(this.modelConfiguration);
      //     this.selectedDataSet = selectedDataSet(this.modelConfiguration);
      //     this.selectedModel = selectModel(this.modelConfiguration);
      // });
  }
  routeModelList(){
    this.router.navigate(['crsmodel/model-list']);
  }

}
