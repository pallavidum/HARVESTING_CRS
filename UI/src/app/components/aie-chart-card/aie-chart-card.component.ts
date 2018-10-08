import { Component, OnInit, Input, OnDestroy,ElementRef ,ViewChild, AfterViewInit, Renderer2  } from '@angular/core';
import { Categorical, Numerical, ConfigureModel } from 'app/crs-model/shared/configure-model';
import { selectedDataSet } from '../../crs-model/shared/extensions';
import { ConfigureModelService } from '../../crs-model/shared/configure-model.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import { BreadcrumbsComponent } from '../../layouts/admin/breadcrumbs/breadcrumbs.component';
declare var Plotly: any;

@Component({
  selector: 'app-aie-chart-card',
  templateUrl: './aie-chart-card.component.html',
  styleUrls: ['./aie-chart-card.component.css']
})
export class AieChartCardComponent implements OnInit,AfterViewInit {
  public isLoading : boolean = true;
  public showloader: boolean = false;      
  private subscription: Subscription;
  private timer: Observable<any>;
  @ViewChild('flipContainer') flipContainer: ElementRef;
  ngAfterViewInit(): void {
    this.setTimer();    
  }
  @Input('column') column: Column;
  data: any;
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    console.log(this.column);
    switch(this.column.name){
      case 'distToWater': this.column.name = 'Dist to Water';
                          break;
      case 'distToNextNaturalWater': this.column.name = 'Dist to Next Natural Water';
                                     break;
      case 'distToNextPrimaryHighWay': this.column.name = 'Dist to Next Primary Highway';
                                       break;
      case 'distToNextVillage': this.column.name = 'Dist to Next Village';
                                 break;
      case 'distToNextCity':  this.column.name = 'Dist to Next City';
                              break;
    }    
  }  

  public setTimer(){
    this.timer        = Observable.timer(5000); 
    this.subscription = this.timer.subscribe(() => {
        this.isLoading = false;
        this.generateChart();
    });
  }

  generateChart(){
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
    const trace = {
      x: this.column.data,
      type: 'histogram',
      marker: {
        color: 'rgb(54, 88, 114)',
        line: {
          color: 'rgb(28, 43, 54)',
          width: 1,
        },
      },
      opacity: 0.5,
      name: this.column.name,
    };
    var chartWidth = this.flipContainer.nativeElement;
    const layout = {      
      width: (this.flipContainer.nativeElement.offsetWidth - 5)
    };
    Plotly.newPlot(this.column.name, [trace],layout);
  }

}
interface Column{
    data : string[],
    isNumeric : boolean,
    name : string
}

