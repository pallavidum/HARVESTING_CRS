import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import { chart } from 'highcharts';
import * as Highcharts from 'highcharts/highcharts';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/histogram-bellcurve')(Highcharts);

@Component({
    selector: 'app-bell-curve',
    templateUrl: './bell-curve.component.html',
    styleUrls: ['./bell-curve.component.css'],
})
export class BellCurveComponent implements OnInit, AfterViewInit {
    @Input('data') data: number[];
    @Input('title') title: string;
    @Input('score') score: number;
    
    @ViewChild('chartTarget') chartTarget: ElementRef;
    ranges : number[] = [];
    chart: Highcharts.ChartObject;
    minScore : number;
    maxScore : number;
    constructor() {
     }
    ngOnInit() {

    }
    updateChart(values){
        this.maxScore = Math.max(...this.data);
        this.minScore = Math.min(...this.data);
        var totalRange = this.maxScore - this.minScore;
        var bracket = totalRange/5;
        var temp = this.minScore+bracket;
        for(var i=0;i<5;i++){
        if(i>0 )temp = temp+bracket;
        this.ranges.push(temp);
        }
        console.log(this.maxScore);
        console.log(this.minScore);
        const options: Highcharts.Options = {
            title: {
                text: this.title,
            },
            series: [{
                name: this.title,
                tooltip: {
                    pointFormatter: function() {
                      var point = this;
                      return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.x + '</b><br/>';
                    }
                  },
                type: 'bellcurve',
                showInLegend: false,
                id: 'dataseries',
                zoneAxis: 'x',
                xAxis: 0,
                yAxis: 0,
                baseSeries: 1,
                pointsInInterval: bracket,
                intervals: 4,
                zIndex: 998,
                zones: [{
                    value: values[0],
                    color: {
                        linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
                        stops: [
                            [0, 'rgb(230,47,45)'],
                            [1, 'rgb(231,71,44)'],
                        ],
                    },
                },{
                    value: values[1],
                    color: {
                        linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
                        stops: [
                            [0, 'rgb(231,71,44)'],
                            [1, 'rgb(234,122,38)'],
                        ],
                    },
                }, {
                    value: values[2],
                    color: {
                        linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
                        stops: [
                            [0, 'rgb(234,122,38)'],
                            [1, 'rgb(216,169,15)'],
                        ],
                    },
                }, {
                    value: values[3],
                    color: {
                        linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
                        stops: [
                            [0, 'rgb(216,169,15)'],
                            [1, 'rgb(145,186,1)'],
                        ],
                    },
                },
                {
                    value: this.maxScore,
                    color: {
                        linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
                        stops: [
                            [0, 'rgb(145,186,1)'],
                            [1, 'rgb(104,194,5)'],
                        ],
                    }}],
                    color: {
                        linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
                        stops: [
                            [0, 'rgb(145,186,1)'],
                            [1, 'rgb(104,194,5)'],
                        ],
                    }
            }, {
                name: 'Data',
                type: 'scatter',
                data: this.data,
                marker: {
                    radius: 5,
                },            
                visible: false,
                showInLegend: false,
            }],
            xAxis: [{
                title: { text: 'Credit Score' },minTickInterval:20,startOnTick: true,
                endOnTick: false,
                showLastLabel: true,min:this.minScore
                },                 
                {
                title: { text: 'Bell curve' }, plotLines: [{
                    color: 'black',
                    width: 1,
                    value: this.score,
                    zIndex: 9999,
                    label: {
                        text: 'Your Fall Here',
                        align: 'right',
                        rotation: '90deg',
                        x: 90,
                        y: 40,
                        style: { color: 'black', fontWeight: 'bold' },
                    },
                }],
            }],

            yAxis: [{
                title: { text: 'Bell curve' },
                visible: false
            },{
                title: { text: 'Number of Customers' }, min: 0, max: 1300, tickinterval: 200,
            }, 
            ],
        };
        this.chart = chart(this.chartTarget.nativeElement, options);
    }
    mode(array)
    {
        if(array.length == 0)
            return null;
        var modeMap = {};
        var maxEl = array[0], maxCount = 1;
        for(var i = 0; i < array.length; i++)
        {
            var el = array[i];
            if(modeMap[el] == null)
                modeMap[el] = 1;
            else
                modeMap[el]++;  
            if(modeMap[el] > maxCount)
            {
                maxEl = el;
                maxCount = modeMap[el];
            }
        }
        return modeMap;
    }
    ngAfterViewInit(): void {
        let str = '';
        for(var i=0;i<this.data.length;i++){
            str = str+this.data[i]+',';
        }
        this.maxScore = Math.max(...this.data);
        this.minScore = Math.min(...this.data); 
        var totalRange = this.maxScore - this.minScore;
        var bracket = Math.floor(totalRange/5);
        for(var i=1;i<=5;i++){
         this.ranges.push(this.minScore+i*bracket);
        }
        const options: Highcharts.Options = {
            title: {
                text: this.title,
            },
            series: [{
                name: this.title,
                tooltip: {
                    pointFormatter: function() {
                      var point = this;
                      return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.x + '</b><br/>';
                    }
                  },
                type: 'bellcurve',
                showInLegend: false,
                id: 'dataseries',
                zoneAxis: 'x',
                xAxis: 0,
                yAxis: 0,
                baseSeries: 1,
                pointsInInterval: bracket,
                intervals: 4,
                zIndex: 998,
                zones: [{
                    value: this.ranges[0],
                    color: {
                        linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
                        stops: [
                            [0, 'rgb(230,47,45)'],
                            [1, 'rgb(231,71,44)'],
                        ],
                    },
                },{
                    value: this.ranges[1],
                    color: {
                        linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
                        stops: [
                            [0, 'rgb(231,71,44)'],
                            [1, 'rgb(234,122,38)'],
                        ],
                    },
                }, {
                    value: this.ranges[2],
                    color: {
                        linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
                        stops: [
                            [0, 'rgb(234,122,38)'],
                            [1, 'rgb(216,169,15)'],
                        ],
                    },
                }, {
                    value: this.ranges[3],
                    color: {
                        linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
                        stops: [
                            [0, 'rgb(216,169,15)'],
                            [1, 'rgb(145,186,1)'],
                        ],
                    },
                },
                {
                    value: this.maxScore,
                    color: {
                        linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
                        stops: [
                            [0, 'rgb(145,186,1)'],
                            [1, 'rgb(104,194,5)'],
                        ],
                    }}],
                    color: {
                        linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
                        stops: [
                            [0, 'rgb(145,186,1)'],
                            [1, 'rgb(104,194,5)'],
                        ],
                    }
            }, {
                name: 'Data',
                type: 'scatter',
                data: this.data,
                marker: {
                    radius: 5,
                },
                visible: false,
                showInLegend: false,
            }],
            xAxis: [{
                title: { text: 'Credit Score' },minTickInterval:20,startOnTick: true,
                endOnTick: false,
                showLastLabel: true,min:this.minScore
                },                 
                {
                title: { text: 'Bell curve' }, plotLines: [{
                    color: 'black',
                    width: 1,
                    value: this.score,
                    zIndex: 9999,
                    label: {
                        text: 'Your Fall Here',
                        align: 'right',
                        rotation: '90deg',
                        x: 90,
                        y: 40,
                        style: { color: 'black', fontWeight: 'bold' },
                    },
                }],
            }],

            yAxis: [{
                title: { text: 'Bell curve' },
                visible: false
            },{
                title: { text: 'Number of Customers' }, min: 0, max: 1300, tickinterval: 200,
            }, 
            ],
        };
        if (this.score === 0) {
            options.xAxis[1].visible = false;
        }
        this.chart = chart(this.chartTarget.nativeElement, options);
    }
}
