import { Component, OnInit } from '@angular/core';
import { ConfigureModelService } from '../shared/configure-model.service';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { selectModel, selectedDataSet } from '../shared/extensions';
import { Location } from '@angular/common';
import { ConfigureModel, Model, DataSet, ModelDetail, SelectedModel } from '../shared/configure-model';
import { WizardService } from 'app/components/wizard/wizard.service';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css']
})
export class ModelListComponent implements OnInit {
  
  configModel : ConfigureModel[];
  showDialog: boolean = false; 
  modelConfiguration: ConfigureModel;
  models: ModelDetail[] = [];
  selectedModel : SelectedModel;
  deleteModel : deleteModel;
  constructor(private modelService: ConfigureModelService, private router: Router,
    private location: Location,private wizardService: WizardService) { }

  ngOnInit() {
    this.modelService.getModels().subscribe((res : ConfigureModel[])=>{
      this.configModel = res;
       this.configModel.forEach(config=>{
        if(config.models){
          config.models.forEach(x=>this.models.push({
            dataset : config.dataSets[0],
            configModel : x,
            configureModel : config
          }));
         }
      })
    });
  }
  
  deleteProject(project: ModelDetail): void {
    const csvPath = project.configureModel.dataSets.filter(x => x.isSelected)[0].csvPath;
    this.deleteModel = {projectId : project.configureModel._id,csvPath: csvPath,modelName: project.configModel.modelName};   
    this.showDialog = true;   
  }

  delete(){
    this.modelService.deleteProjectName(this.deleteModel.projectId, this.deleteModel.csvPath).subscribe((result: boolean) => {   
      if (result) {
        this.showDialog = false;
        this.modelService.getModels().subscribe((res: ConfigureModel[]) => {
          this.configModel = res;
          this.models = [];
          this.configModel.forEach(config=>{
            if(config.models){
              config.models.forEach(x=>this.models.push({
                dataset : config.dataSets[0],
                configModel : x,
                configureModel : config
              }));
             }
          })
        });
      }
    });
  }

  selectModel(model:ConfigureModel){
    model.isLite = (model.dataSets[0].rowCount <= 6000) ? true:false;
    if(model.isLite) this.wizardService.isLite.next(1);
    else this.wizardService.isLite.next(0);
    this.modelService.model = Observable.of(model);
    localStorage.setItem("configModel",JSON.stringify(model));
    this.router.navigate(['crsmodel/perform']);
  }

  loadAPI(model){
    model.isLite = (model.dataSets[0].rowCount <= 6000) ? true:false;
    if(model.isLite) this.wizardService.isLite.next(1);
    else this.wizardService.isLite.next(0);
    this.modelService.model = Observable.of(model);
    localStorage.setItem("configModel",JSON.stringify(model));
    this.router.navigate(['crsmodel/model-deploy']);
  }

}

interface deleteModel{
  modelName: string,
  projectId : string,
  csvPath : string
}



