import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts/highcharts';
import { Router, NavigationEnd, RoutesRecognized, ActivatedRoute, Params } from '@angular/router';
import { ConfigureModelService } from '../crs-model/shared/configure-model.service';
import { color } from 'd3';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/histogram-bellcurve')(Highcharts);

@Component({
  selector: 'app-tdp',
  templateUrl: './tdp.component.html',
  styleUrls: ['./tdp.component.css']
})
export class TdpComponent implements OnInit,AfterViewInit {

  chart : Chart;
  areaChart : Chart;
  donutChart : Chart;
  gaugeChart : Chart;
  pieChart : Chart;
  score: any;

  constructor(private configService : ConfigureModelService,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    let cropData:any;

    this.activatedRoute.params.subscribe((params: Params) => {
    
     let id = params['id'];
     let score = parseInt(params['score']);
     this.score = score;
     let gaugeChart = new Chart({
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },title: {
      text: ' '
    },
    pane: {
      startAngle: -90,
      center: ['50%', '90%'],
      endAngle: 90,
      background: {backgroundColor: 'white', borderWidth: 0}
     },
     yAxis:{
      min: 350,
      max: 800,
      
      minorTickInterval: 'auto',
      minorTickWidth: 0,
      minorTickLength: 10,
      minorTickPosition: 'inside',
      minorTickColor: '#666',

      tickPixelInterval: 30,
      tickWidth: 0,
      tickPosition: 'inside',
      tickLength: 10,
      tickColor: '#666',
      labels :{
        autoRotation : [2]
      },
      plotBands: [{
        from: 350,
        to: 500,
        color: {
          linearGradient:  { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
              [0, '#ed842e'],
              [1, '#cc0000'] 
          ]
      }
      },{
        from: 500,
        to: 575,
        color: {
          linearGradient:  { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
              [0, '#ecb83f'],
              [1, '#ed842e']
               
          ]
      }
    },
    {
      from: 575,
      to:650,
      color:{
        linearGradient : {x1:0,x2:0,y1:0,y2:1},
        stops : [
          [0,'green'],
          [1, '#ecb83f']          
        ]
      }
    }
    , {
        from: 650,
        to: 800,
        color: 'green' 
    }],
     },
     plotOptions :{
      gauge: {
              
        dataLabels: {
            enabled: false      
        },
        pivot: {
            radius: 0
        },
        dial: {
            backgroundColor: 'orange'   
        }
    }
     },
     series:[{
      name: 'Progress',
      data: [score],
     }]
    });   

    this.gaugeChart = gaugeChart; 

     this.configService.getFarmerData(id).subscribe(x=>{
    this.configService.getCropDataForGraph(x.state,x.district,x.cropType).subscribe(result=>{
      let years = [];
      let totalArea = [];
      let productionArea = [];

      result.forEach(element => {
        if(!years.includes(parseInt(element.Year)))
        {
          years.push(parseInt(element.Year));
          totalArea.push(parseInt(element.Area));
          productionArea.push(parseInt(element.Production));
        }
      });
      let areaChart = new Chart({
        chart:{
          type : 'area'
        },
        title:{
          text : ' '
        },
        credits: {
          enabled : false
        },
        xAxis:{
         allowDecimals: false,
         labels: {
            formatter: function () {
               return this.value; // clean, unformatted number for year
            }
         }
        },
        yAxis: {
         title: {
            text: ' '
         },
         labels: {
            formatter: function () {
               return this.value/1000 + 'k';
            }
         }
      },
      plotOptions:{
       area: {
         pointStart: years[0],
         marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            
            states: {
               hover: {
                  enabled: true
               }
            }
         }
      }
      },
        series:[
          {
            name: 'Area Under Cultivation',
            data: productionArea,
            color:'#bfea91',
            zIndex : 9999
         },
         {
           name: 'Total Area',
           data: totalArea,
           color : '#4993be'
        }        
        ]
     });
     this.areaChart = areaChart;

    });
  });
  });

    let chart = new Chart({
      xAxis: {
        categories: ['2012-03-31', '2013-03-31', '2014-03-31','2015-03-31','2016-03-31','2017-03-31','2018-03-31'],
        labels: {
            formatter: function () {
                return this.value.split('-')[0];
            }
        }
    }
    ,
        title:{
          text : ' '
        },
      chart: {
        type: 'line'
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'MSP Data',
        data: [370,750,400,800,1200,1600,2000],
        color: '#bfea91'
      }]
    });
    this.chart = chart;    

    let donutChart = new Chart({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title:{
        text : ' '
    }
    ,
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
          dataLabels: {
            enabled: false
        },
        showInLegend: true,
        startAngle: -360,
        endAngle: 360
        }
    },
    series: [{
        type: 'pie',
        name: 'Browser share',
        innerSize: '50%',
        data: [
            ['Home', 60],
            ['Finance', 28],
            ['Agriculture', 12],
            // {
            //     name: 'Other',
            //     y: 7.61,
            //     dataLabels: {
            //         enabled: false
            //     }
            // }
        ]
    }],

    responsive: [{
        rules: [{
            condition: {
                maxWidth: 100
            }
        }]
       }]
    });
    this.donutChart = donutChart;      

    Highcharts.setOptions({
      colors: ['#9dc83c', '#4892bd', '#46e0fe']
     });
    let pieChart = new Chart({
      chart:{
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
     },
        title:{
          text : ' '
        },
     plotOptions:{
      pie: {
        dataLabels: {
          enabled: false
      },
      showInLegend: true
     }
     },
     series : [{
      type: 'pie',
      name: 'Loan Share',
      data: [
         ['Paid',   40],
         ['Remaining',       60]
      ]
   }]
    });
    this.pieChart = pieChart;
    this.pieChart.options.series[0] = pieChart.options.series[0];
  }

  

  ngAfterViewInit(){
      this.pieChart.options.title = {text : ' '};
      let charts  = document.getElementsByClassName('.highcharts-container');
      console.log(charts.length);
  }

}
