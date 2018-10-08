import { Component, OnInit } from '@angular/core';
import { ConfigureModelService } from '../shared/configure-model.service';
import { ConfigureModel, Model, AlgorithmsEnum } from '../shared/configure-model';
import { selectModel } from '../shared/extensions';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { WizardService } from '../../components/wizard/wizard.service';

@Component({
  selector: 'app-select-algorithm',
  templateUrl: './select-algorithm.component.html',
  styleUrls: ['./select-algorithm.component.css']
})
export class SelectAlgorithmComponent implements OnInit {
  modelConfiguration: ConfigureModel;
  selectedModel: Model;
  constructor(private modelService: ConfigureModelService,
    private router: Router, private title: Title,
    private wizard: WizardService) { }

  ngOnInit() {
    this.wizard.activeTab.next(3);
    this.title.setTitle('Select Algorithm | CRS | Harvesting');
    this.modelService.model.subscribe(res => {
      if(res.dataSets.length == 0){
        this.modelConfiguration = JSON.parse(localStorage.getItem("configModel"));
        this.modelService.model = Observable.of(this.modelConfiguration);
      }
      else{
      this.modelConfiguration = res;
      }
      this.selectedModel = selectModel(this.modelConfiguration);
      if(this.modelConfiguration.isLite){
        this.selectAlgo(1);
        this.moveNext();
      }
    });
  }
  selectAlgo(type: number): void {
    this.selectedModel.selectedAlgoType = type;
    this.selectedModel.selectedAlgoName = AlgorithmsEnum[type];
    this.title.setTitle(`${AlgorithmsEnum[type]} | CRS | Harvesting`);
  }
  moveNext() {
    this.modelService.model = Observable.of(this.modelConfiguration);
    localStorage.setItem("configModel",JSON.stringify(this.modelConfiguration));
    this.router.navigate(['crsmodel/perform']);
  }
  moveBack() {
    if(this.modelConfiguration.isLite){
      this.router.navigate(['crsmodel/features/1'])
    }
    else{
    this.router.navigate(['crsmodel/partition/1'])
    }
  }
}
