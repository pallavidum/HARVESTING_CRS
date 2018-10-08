import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { WizardService } from '../../components/wizard/wizard.service';
import { ConfigureModel, DataSet, Model } from '../shared/configure-model';
import { ConfigureModelService } from '../shared/configure-model.service';
import { selectedDataSet, selectModel } from '../shared/extensions';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BellCurveComponent } from '../../components/bell-curve/bell-curve.component';
import { ScoreCardComponent } from '../../components/score-card/score-card.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-apply-score',
  templateUrl: './apply-score.component.html',
  styleUrls: ['./apply-score.component.css']
})
export class ApplyScoreComponent implements OnInit,AfterViewInit {
  @ViewChild(BellCurveComponent) bellCurve;
  @ViewChild(ScoreCardComponent) scoreCard;
  ngAfterViewInit(): void {
    var connect = this.elementRef.nativeElement.querySelectorAll('.noUi-connect');
    if(connect){
    for ( var i = 0; i < connect.length; i++ ) {
      connect[i].style.background = this.colors[i];
     }
    }
    // connect[connect.length-1].style.display = "none";
    // var handles = this.elementRef.nativeElement.querySelectorAll('.noUi-handle');
    // handles[handles.length-1].disabled = true;
    // handles[handles.length-1].style.display = "none";
  }
  modelConfiguration: ConfigureModel;
  selectedDataSet: DataSet;
  selectedModel: Model;
  someRange: number[] = [1, 100];
  data: number[];
  ids: number[];
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  colors = ['red', 'yellow', 'green', 'rgb(216,169,15)', 'rgb(145,186,1)', '#88BD5B'];
  someKeyboardConfig: any;
  constructor(private wizard: WizardService, private modelService: ConfigureModelService,
  private title: Title,private router: Router, private elementRef: ElementRef) { }

  updateScreen(slider,value){
    let values = [];
    values.push(value[0]);
    values.push(parseInt(value[0])+Math.floor((value[1]-value[0])/2));
    values.push(value[1]);
    values.push(parseInt(value[1])+Math.floor((Math.max(...this.data)-value[1])/2));
    values.push(Math.max(...this.data));
    this.bellCurve.updateChart(values);
    this.scoreCard.updateRanges(values);
  }

  ngOnInit() {
    this.title.setTitle('Apply Model | CRS | Harvesting');
    this.wizard.activeTab.next(5);
    this.modelService.model.subscribe(res => {
      if(res.dataSets.length == 0){
        this.modelConfiguration = JSON.parse(localStorage.getItem("configModel"));
        this.modelService.model = Observable.of(this.modelConfiguration);
      }
      else{
      this.modelConfiguration = res;
      }
      this.selectedDataSet = selectedDataSet(this.modelConfiguration);
      this.selectedModel = selectModel(this.modelConfiguration);
      this.data = this.selectedModel.modelResult.scores;
    });    
    const minPoint = Math.min(...this.data);
    const maxPoint = Math.max(...this.data);
    const totalRange = maxPoint - minPoint;
    const handlePoints : number[] = [];
    const bracket = Math.floor(totalRange/3);
    for(let i=1;i<3;i++){
      handlePoints.push(minPoint+i*bracket);
    }
    this.ids = this.generatePoints(10, 1, 29000, 1);
    this.someKeyboardConfig ={
      range: {
        'min': minPoint,
        'max': maxPoint
      },    
      step: 1,
      start: handlePoints,
      connect: [true,true,true],
      tooltips: true,
      format: {
        to: function ( value ) {
        return parseInt(value);
        },
        from: function ( value ) {
        return parseInt(value).toString().replace('%', '');
        }
      }
    };

  }

  generatePoints(range: number, from: number, to: number, frequency = 0): number[] {
    let points: number[] = [];
    do {
      const randomNumber = Math.floor(Math.random() * (to - from + 1)) + from;
      const randomFrequency = frequency === 0 ? Math.floor(Math.random() * (10 - 2 + 1)) + 2 : frequency;
      for (let i = 0; i < randomFrequency; i++) {
        points.push(randomNumber);
      }
    } while (points.length < range);
    return points;
  }
  scoreColor(score: number) {
    if (score <= 350) {
      return '#EF5350';
    } else if (score <= 500) {
      return '#EF5350';
    } else if (score <= 650) {
      return '#8BC34A';
    } else {
      return 'green';
    }
  }
  moveBack()
  {
    this.router.navigate(['crsmodel/perform'])
  }
}
