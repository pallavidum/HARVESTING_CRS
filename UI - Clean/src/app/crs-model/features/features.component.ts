import { Component, OnInit } from '@angular/core';
import { ConfigureModel, DataSet, AlgorithmsEnum, Column } from '../shared/configure-model';
import { Observable } from 'rxjs/Observable';
import { ConfigureModelService } from '../shared/configure-model.service';
import { selectedDataSet, selectModel } from '../shared/extensions';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { WizardService } from '../../components/wizard/wizard.service';
import { Subscription } from 'rxjs';
import { IndexedDBService } from '../shared/indexedDB.service';


@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {
  public isLoading : boolean = true;
  public showloader: boolean = false;
  public showDialogFeatues: boolean = false;
  showDialog: boolean = false;
  private subscription: Subscription;
  private timer: Observable<any>;
  modelConfiguration: ConfigureModel;
  selectedDataSet: DataSet;
  showAIEData : boolean;
  columns : Column[] = [];
  constructor(private modelService: ConfigureModelService,private activatedRoute: ActivatedRoute,
    private router: Router, private title: Title,
    private wizard: WizardService,public indexedDB : IndexedDBService) { }

  ngOnInit() {
    this.showAIEData = false;
    this.wizard.activeTab.next(2);
    this.title.setTitle('Choose Features | CRS | harvesting');
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log("inside subscribe");
      let id = params['id'];
      if(id == '1'){
        this.fetchAIEData();
      }});
    this.modelService.getAIEModel().subscribe(result=>{
      console.log("inside getAIEModel");
      console.log(result);
      for(var i=0;i<result.length;i++){
        this.columns.push(result[i]);
      }
    });
    this.modelService.model.subscribe(res => {
      if(res.dataSets.length == 0){
        console.log("inside model service subscribe");
        this.modelConfiguration = JSON.parse(localStorage.getItem("configModel"));
        console.log(this.modelConfiguration);
        this.modelService.model = Observable.of(this.modelConfiguration);
      }
      else{
        console.log("not inside model service subscribe");
      this.modelConfiguration = res;
      console.log(res);
      }
      this.selectedDataSet = selectedDataSet(this.modelConfiguration);
      console.log("selectedDataSet");
      console.log(selectedDataSet(this.modelConfiguration));
      if(this.modelConfiguration.isLite) this.showDialog = true;
    })
  }

  public setTimer(){
    this.timer        = Observable.timer(5000);
    this.subscription = this.timer.subscribe(() => {
        this.isLoading = false;
    });
  }

  fetchAIEData(){
    // if(this.modelConfiguration.isLite){
    //   let selectectedModel = selectModel(this.modelConfiguration);;
    //   selectectedModel.selectedAlgoType = 1;
    //   selectectedModel.selectedAlgoName = AlgorithmsEnum[1];
    //   this.router.navigate(['crsmodel/perform']);
    // }
    // else{
      //this.router.navigate(['crsmodel/partition']);
      console.log("fetchAIEData");
      console.log(this.modelConfiguration.dataSets[0].columns);
      if(this.modelConfiguration.dataSets[0].columns.filter(x=>x.isDeleted == false).length == 0){
        this.showDialogFeatues = true;
     }
     else{
        this.showAIEData = true;
        this.setTimer();
    }
    //}
  }

  moveNext() {
    if(this.columns.filter(x=>x.isDeleted == false).length == 0){
      this.showDialogFeatues = true;
    }
    else{
      if(this.modelConfiguration.isLite){
        let selectectedModel = selectModel(this.modelConfiguration);;
        selectectedModel.selectedAlgoType = 1;
        selectectedModel.selectedAlgoName = AlgorithmsEnum[1];
        localStorage.setItem("configModel",JSON.stringify(this.modelConfiguration));
        this.router.navigate(['crsmodel/perform']);
      }
      else{
      this.modelService.model = Observable.of(this.modelConfiguration);
      localStorage.setItem("configModel",JSON.stringify(this.modelConfiguration));
      this.router.navigate(['crsmodel/partition']);
      }
    }
  }

  moveBack() {
    // this.location.back();
    if(!this.showAIEData)
    this.router.navigate(['crsmodel/create/1']);
    else
    {
    this.showAIEData=false;
    this.isLoading=true;
    }
  }
}
