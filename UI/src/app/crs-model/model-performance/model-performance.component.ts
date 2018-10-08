import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ConfigureModel, Model, DataSet, MlTaskResult } from '../shared/configure-model';
import { ConfigureModelService } from '../shared/configure-model.service';
import { selectModel, selectedDataSet } from '../shared/extensions';
import { WizardService } from '../../components/wizard/wizard.service';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-model-performance',
  templateUrl: './model-performance.component.html',
  styleUrls: ['./model-performance.component.css']
})
export class ModelPerformanceComponent implements OnInit, AfterViewInit {
  modelConfiguration: ConfigureModel;
  selectedModel: Model;
  selectedDataSet: DataSet;
  isLoading = false;
  mlTaskResult: MlTaskResult;
  data: any = {
    datasets: [{
      data: [], label: 'train accuracy',
      borderColor: '#ee5253',
      pointRadius: 0,
      fill: true,
      backgroundColor: 'rgba(24, 44, 97,0.2)',
      borderWidth: 1,
      lineTension: 0
    },
    {
      data: [], label: 'test accuracy',
      pointRadius: 0,
      borderColor: '#2c3e50',
      fill: true,
      backgroundColor: 'rgba(24, 44, 97,0.2)',
      borderWidth: 1,
      lineTension: 0
    }],
  };
  options = {
    responsive: true,
    title: {
      display: true,
      text: 'ROC Curve',
    },
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom',
        scaleLabel: {
          display: true,
          labelString: 'False Positive Rate',
        },
      }],
      yAxes: [{
        type: 'linear',
        position: 'bottom',
        scaleLabel: {
          display: true,
          labelString: 'True Positive Rate',
        },
      }],
    },
  };
  precisionData: any = {
    datasets: [{
      data: [], label: 'Precision Recall Curve',
      borderColor: '#2c3e50',
      pointRadius: 0,
      fill: true,
      backgroundColor: 'rgba(24, 44, 97,0.3)',
      borderWidth: 1,
      lineTension: 0
    }],
  };
  precisonOptions = {
    title: {
      display: true,
      text: 'Precision-Recall curve',
    },
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom',
        scaleLabel: {
          display: true,
          labelString: 'Recall',
        },
      }],
      yAxes: [{
        type: 'linear',
        position: 'bottom',
        scaleLabel: {
          display: true,
          labelString: 'Precision',
        },
      }],
    },
  };
  constructor(private modelService: ConfigureModelService,
    private wizard: WizardService, private title: Title,
    private router: Router, private location: Location) { }

  ngOnInit() {
    this.title.setTitle(`Model Performance | CRS | Harvesting`);
    this.isLoading = true;
    this.wizard.activeTab.next(4);
    this.modelService.model.subscribe(res => {
      if(res.dataSets.length == 0){
        this.modelConfiguration = JSON.parse(localStorage.getItem("configModel"));
        this.modelService.model = Observable.of(this.modelConfiguration);
      }
      else{
      this.modelConfiguration = res;
      }
      this.selectedModel = selectModel(this.modelConfiguration);
      this.selectedDataSet = selectedDataSet(this.modelConfiguration);
      if (this.selectedModel.modelResult && this.selectedModel.modelResult.scores) {
        this.mlTaskResult = this.selectedModel.modelResult;
        this.loadGraphs();
        this.isLoading = false;
      } else {
        this.modelService.executeML(this.selectedDataSet.csvPath,
          this.selectedModel.testingSetRatio, this.selectedModel.selectedAlgoName)
          .subscribe(mlResult => {
            this.mlTaskResult = mlResult;
            this.selectedModel.modelResult = mlResult;
            this.loadGraphs();
            this.isLoading = false;
          })
      }
    });
  }
  ngAfterViewInit(): void {

  }
  loadGraphs() {
    this.precisionData.datasets[0].label = this.selectedModel.selectedAlgoName;
    for (let i = 0; i < this.mlTaskResult.roc_data.fpr_train.length; i++) {
      this.data.datasets[0].data.push({
        x: this.mlTaskResult.roc_data.fpr_train[i],
        y: this.mlTaskResult.roc_data.tpr_train[i],
      });
    }
    for (let i = 0; i < this.mlTaskResult.roc_data.fpr_test.length; i++) {
      this.data.datasets[1].data.push({
        x: this.mlTaskResult.roc_data.fpr_test[i],
        y: this.mlTaskResult.roc_data.tpr_test[i],
      });
    }
    for (let i = 0; i < this.mlTaskResult.roc_data.pre_200.length; i++) {
      this.precisionData.datasets[0].data.push({
        x: this.mlTaskResult.roc_data.pre_200[i],
        y: this.mlTaskResult.roc_data.rec_200[i],
      });
    }
  }
  moveNext() {
    this.modelService.model = Observable.of(this.modelConfiguration);
    localStorage.setItem("configModel",JSON.stringify(this.modelConfiguration));
    this.router.navigate(['crsmodel/apply']);
  }
  moveBack() {
    if(this.modelConfiguration.isLite){
      this.router.navigate(['crsmodel/features']);
    }
    else{
    this.router.navigate(['crsmodel/select-algorithm']);
    }
  }
  saveModel(): void {
    let modelName = '';
    this.modelService.checkProjectName(this.selectedModel.modelName).subscribe((res: any) => {   
        if(res){
          modelName = prompt('Model with same name exists. Please enter a differenct model name', ``);
          this.selectedModel.modelName = modelName;
          this.saveModel();
        }
        else{
          if( res==null || this.selectedModel.modelName.trim() == ''){
            modelName = prompt('Please enter model name', ``);
            }
            else{
              modelName = this.selectedModel.modelName;
            }
            if (modelName !== null) {
              this.selectedModel.isSaved = true;
              this.selectedModel.modelName = modelName;
              const columnsSelected: string[] = [];
              const selectedDataSet = this.modelConfiguration.dataSets.filter(x => x.isSelected)[0];
              for (const columns of selectedDataSet.columns) {
                if (!columns.isDeleted) {
                  columnsSelected.push(columns.name);
                }
              }
              this.selectedModel.coloumnsSelected =
                columnsSelected;
              this.modelService.saveModel(this.modelConfiguration).subscribe((res: any) => {
                //this.modelConfiguration.models.push(new Model());        
                this.modelConfiguration.isSaved = true;
                this.modelConfiguration._id = res.id;
                this.wizard.activeTab.next(5);
                alert('Model Saved Successfully!');
                this.modelService.model = Observable.of(this.modelConfiguration);
                this.router.navigate(['crsmodel/model-deploy']);
              });
            }
        }

    });    
  }
  printReport(): void {
    const reportName = `${this.selectedModel.modelName}-${this.selectedModel.selectedAlgoName}`;
    const doc = new jsPDF('l', 'mm');
    const prints = document.getElementsByClassName('print');
    [].forEach.call(prints, function (el, index) {
      html2canvas(el).then(function (canvas) {
        let self = this;
        const img = canvas.toDataURL('image/png');
        doc.addImage(img, 'JPEG', 10, 10);
        if (index === prints.length - 1) {
          doc.save(`${reportName}.pdf`);
        } else {
          doc.addPage();
        }
      });
    });
  }
  
}
