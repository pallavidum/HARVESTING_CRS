import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ConfigureModel, DataSet, Model } from '../shared/configure-model';
import { ConfigureModelService } from '../shared/configure-model.service';
import { selectedDataSet, selectModel } from '../shared/extensions';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WizardService } from '../../components/wizard/wizard.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-partition-dataset',
  templateUrl: './partition-dataset.component.html',
  styleUrls: ['./partition-dataset.component.css']
})
export class PartitionDatasetComponent implements OnInit,AfterViewInit {
  
  @ViewChild('sliderControl') sliderControl;
  isPartition = false;
  modeConfiguration: ConfigureModel;
  rowCount: number;
  selectedModel: Model;
  math: any = Math;
  constructor(private modelService: ConfigureModelService,
    private router: Router, private wizard: WizardService,private activatedRoute: ActivatedRoute,
    private location: Location,private elementRef:ElementRef) { }

  ngOnInit() {
    this.wizard.activeTab.next(2);
    this.modelService.model.subscribe(res => {
      if(res.dataSets.length == 0){
        this.modeConfiguration = JSON.parse(localStorage.getItem("configModel"));
        this.modelService.model = Observable.of(this.modeConfiguration);
      }
      else{
      this.modeConfiguration = res;
      }
      this.selectedModel = selectModel(this.modeConfiguration);
      this.rowCount = selectedDataSet(this.modeConfiguration).rowCount;
    });
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params['id'];
      if(id == '1'){
        this.doPartition();
      }});
  }

  changeZoom(value: number) { 
    console.log(value);
    this.selectedModel.trainingSetRatio = 50 + Math.round(0.3*value);
    this.selectedModel.testingSetRatio = 100 - this.selectedModel.trainingSetRatio;
  }

  ngAfterViewInit() {
    //const fi = this.elementRef.nativeElement.querySelector('.mydivheader');
    // const fi2 = this.elementRef.nativeElement.querySelector('.mydiv');
    // //this.dragElement(fi);
    // this.dragElement(fi2);
  }

  doPartition() {
    this.isPartition = true;
  }
  selectAlgo() {
    localStorage.setItem("configModel",JSON.stringify(this.modeConfiguration));
    this.router.navigate(['crsmodel/select-algorithm']);
  }
  moveBack() {
    this.router.navigate(['crsmodel/features/1'])
  }
  moveToUpload() {
    this.router.navigate(['crsmodel/create']);
  }
  modifyRatio(action: number) {
    selectModel(this.modeConfiguration).modelResult = null;
    if (action === 1 && this.selectedModel.trainingSetRatio <= 70) {
      this.selectedModel.trainingSetRatio += 10;
      this.selectedModel.testingSetRatio -= 10;
    } else if (action === 0 && this.selectedModel.trainingSetRatio >= 60) {
      this.selectedModel.testingSetRatio += 10;
      this.selectedModel.trainingSetRatio -= 10;
    }
  }

 dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  let selectedModel = this.selectedModel;
  if (document.getElementById(elmnt.id )) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

function dragMouseDown(e) {
  e = e || window.event;
  // get the mouse cursor position at startup:
  pos3 = e.clientX;
  document.onmouseup = closeDragElement;
  // call a function whenever the cursor moves:
  document.onmousemove = elementDrag;
  if(selectedModel.trainingSetRatio<50) {selectedModel.trainingSetRatio = 50; selectedModel.testingSetRatio = 50;}
  if(selectedModel.trainingSetRatio>80){ selectedModel.testingSetRatio = 80; selectedModel.testingSetRatio=20;}
}
  
function elementDrag(e) {
  if(selectedModel.trainingSetRatio<50){
    selectedModel.trainingSetRatio = 50;
  }
  if(selectedModel.testingSetRatio>20){
    selectedModel.testingSetRatio = 20;
  }
  let elementWidth = elmnt.parentNode.offsetWidth;
  let elementLeft = elmnt.offsetLeft;
  let ratio = elementLeft/elementWidth;
  console.log(elementWidth+':'+elementLeft+':'+ratio);
  if((elmnt.offsetLeft)<(0.5*(elmnt.parentNode.offsetWidth - elmnt.parentNode.offsetLeft))){
    elmnt.style.left = (0.5*(elmnt.parentNode.offsetWidth - elmnt.parentNode.offsetLeft)+2) + "px";
    selectedModel.trainingSetRatio = Math.floor(ratio*100);
    selectedModel.testingSetRatio = 100 - Math.floor(ratio*100);
  }
  if((elmnt.offsetLeft)>(0.8*elmnt.parentNode.offsetWidth)){
    elmnt.style.left = ((0.8*elmnt.parentNode.offsetWidth)+2) + "px";
    selectedModel.trainingSetRatio = Math.floor(ratio*100);
    selectedModel.testingSetRatio = 100 - Math.floor(ratio*100);
  }
  if((elmnt.offsetLeft)>= 0.5*elmnt.parentNode.offsetLeft && elmnt.offsetLeft){
  e = e || window.event;
    selectedModel.trainingSetRatio = Math.floor(ratio*100);
    selectedModel.testingSetRatio = 100 - Math.floor(ratio*100);
  // calculate the new cursor position:
  pos1 = pos3 - e.clientX;
  pos3 = e.clientX;
  elmnt.style.left = (elmnt.offsetLeft-pos1+2) + "px";
  }
  console.log(selectedModel.trainingSetRatio);
  if(selectedModel.trainingSetRatio<50) {selectedModel.trainingSetRatio = 50; selectedModel.testingSetRatio = 50;}
  if(selectedModel.trainingSetRatio>80){ selectedModel.testingSetRatio = 80; selectedModel.testingSetRatio=20;}
  }

function closeDragElement() {
  /* stop moving when mouse button is released:*/
  document.onmouseup = null;
  document.onmousemove = null;
}
 }
}
