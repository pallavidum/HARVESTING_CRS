import { Component, OnInit, Input, OnDestroy,ElementRef ,ViewChild, AfterViewInit, AfterContentInit  } from '@angular/core';
import { Categorical, Numerical, ConfigureModel, SelectedModel, MlTaskResult } from 'app/crs-model/shared/configure-model';
import { selectedDataSet, selectModel } from '../../crs-model/shared/extensions';
import { ConfigureModelService } from '../../crs-model/shared/configure-model.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
declare var Plotly: any;

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.css']
})
export class ChartCardComponent implements OnInit, OnDestroy {
  modelConfiguration: ConfigureModel;
  @Input('column') column: Column;
  @Input('flippable') flippable: boolean;
  @ViewChild('flipContainer') flipContainer: ElementRef;
  type = 'bar';
  data: any;
  featureInfo: Categorical | Numerical;
  isLoading = false;
  flip = false;
  private isDestroyed$: Subject<Boolean> = new Subject<boolean>();
  constructor(private modelService: ConfigureModelService,private elementRef: ElementRef) { }

  ngOnInit() {
    this.modelService.model.subscribe(res => {
      this.modelConfiguration = res; this.loadFeatureinfo();
    });
  }
  loadFeatureinfo(): void {
    this.isLoading = true;
    const featureType = this.column.isNumeric ? 1 : 0;
    const selectedColumn = selectedDataSet(this.modelConfiguration).predictionColumn;
    this.modelService.featureInfo(featureType, this.column.name, this.modelConfiguration.selectedDataSet,
      selectedColumn)
      .takeUntil(this.isDestroyed$)
      .subscribe((res: Categorical | Numerical) => {
        console.log(res);
        this.featureInfo = res;
        this.generateChart();
        this.isLoading = false;
      });
  }
  generateChart(): any {
    this.data = {
      'labels': [],
      'datasets': [
        {
          'label': '',
          'data': [],
          'fill': true,
          'backgroundColor': '#9bacb9',
          'borderWidth': 1,
        },
      ],
    };
    this.data = {
      labels: [],
      datasets: [{
        label: this.column.name,
        backgroundColor: '#9bacb9',
        data: [],
      }]
    };
    this.data.labels = [];
    this.data.datasets[0].data = [];
    if ((<Categorical>this.featureInfo).x_vals !== undefined) {
      const feature = <Categorical>this.featureInfo;
      if (feature.x_vals !== undefined) {
        for (const itm in feature.x_vals) {
          if (feature.x_vals[itm]) {
            this.data.labels.push(feature.x_vals[itm]);
            this.data.datasets[0].data.push(feature.y_vals[itm]);
          }
        }
        this.data.datasets[0].label = feature.feature;
      }
    } else {
      const feature = <Numerical>this.featureInfo;
      if (feature.x_hist !== undefined) {        
        const trace = {
          x: feature.x_hist,
          type: 'histogram',
          marker: {
            color: 'rgb(54, 88, 114)',
            line: {
              color: 'rgb(28, 43, 54)',
              width: 1,
            },
          },
          opacity: 0.5,
          name: feature.feature,
        };
        const layout = {      
          width: (this.flipContainer.nativeElement.offsetWidth - 5)
        };
        Plotly.newPlot(feature.feature, [trace], layout);
      }
    }
  }
  changeActiveChart(chartType) {
    this.column.isNumeric = !this.column.isNumeric;
    this.loadFeatureinfo();
  }
  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }
  
  changeFeatures(){
    if(selectedDataSet(this.modelConfiguration) && selectModel(this.modelConfiguration) && selectModel(this.modelConfiguration).modelResult){
      selectModel(this.modelConfiguration).modelResult = null;
    } 
  }

  flipCard(event){
    if(!this.flippable){
      event.target.classList.remove('flip');
    }
    else{      
      var element = this.elementRef.nativeElement.querySelector('.flip-container');
      if(this.flipContainer.nativeElement.classList.contains('flip')){
        this.flipContainer.nativeElement.classList.remove('flip');
      }
      else{
        this.flipContainer.nativeElement.classList.add('flip');
      }
    }
    //if(this.flippable){this.classList.toggle('hover');}
  }
}

interface Column {
  name: string;
  isNumeric: boolean;
  isDeleted: boolean;
  defaultValue: string;
}
