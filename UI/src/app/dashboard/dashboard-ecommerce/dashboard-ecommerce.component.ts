import {Component, OnInit, ViewEncapsulation} from '@angular/core';
declare const $: any;
import 'd3';
import * as c3 from 'c3';
import '../../../assets/echart/echarts-all.js';

@Component({
  selector: 'app-dashboard-ecommerce',
  templateUrl: './dashboard-ecommerce.component.html',
  styleUrls: [
    '../../../../node_modules/c3/c3.min.css',
    './dashboard-ecommerce.component.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class DashboardEcommerceComponent implements OnInit {
  donutChartData =  {
    chartType: 'PieChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work', 11],
      ['Eat', 2],
      ['Commute', 2],
      ['Watch TV', 2],
      ['Sleep', 7]
    ],
    options: {
      height: 320,
      title: 'My Daily Activities',
      pieHole: 0.4,
      colors: ['#2ecc71', '#01C0C8', '#FB9678', '#5faee3', '#f4d03f']
    },
  };

  pieChartOption: any;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      const chart = c3.generate({
        bindto: '#chart4',
        data: {
          columns: [
            ['data1', 30, 20, 50, 40, 60, 50],
            ['data2', 200, 130, 90, 240, 130, 220],
            ['data3', 300, 200, 160, 400, 250, 250],
            ['data4', 200, 130, 90, 240, 130, 220],
            ['data5', 130, 120, 150, 140, 160, 150],
            ['data6', 90, 70, 20, 50, 60, 120],
          ],
          type: 'bar',
          colors: {
            data1: '#00C292',
            data2: '#4C5667',
            data3: '#03A9F3',
            data4: '#AB8CE4',
            data5: '#a3aebd',
            data6: '#FEC107'
          },
          types: {
            data3: 'spline',
            data4: 'line',
            data6: 'area',
          },
          groups: [
            ['data1', 'data2']
          ]
        }
      });
      this.pieChartOption = {
        'tooltip': {
          'trigger': 'item',
          'formatter': '{a} <br/>{b}: {c} ({d}%)'
        },
        'legend': {
          'orient': 'vertical',
          'x': 'left',
          'data': [
            'Direct',
            'Marketing advertising',
            'search engine',
            'Mail marketing',
            'Affiliate advertising',
            'Video ad',
            'Baidu',
            'Google',
            'must',
            'other'
          ]
        },
        'series': [
          {
            'name': 'access source',
            'type': 'pie',
            'selectedMode': 'single',
            'radius': [
              0,
              '30%'
            ],
            'label': {
              'normal': {
                'position': 'inner'
              }
            },
            'labelLine': {
              'normal': {
                'show': false
              }
            },
            'data': [
              {
                'value': 335,
                'name': 'direct',
                'selected': true
              },
              {
                'value': 679,
                'name': 'marketing ad'
              },
              {
                'value': 1548,
                'name': 'search engine'
              }
            ]
          },
          {
            'name': 'access source',
            'type': 'pie',
            'radius': [
              '40%',
              '55%'
            ],
            'data': [
              {
                'value': 335,
                'name': 'direct'
              },
              {
                'value': 310,
                'name': 'mail marketing'
              },
              {
                'value': 234,
                'name': 'affiliate ad'
              },
              {
                'value': 135,
                'name': 'video ad'
              },
              {
                'value': 1048,
                'name': 'Baidu'
              },
              {
                'value': 251,
                'name': 'google'
              },
              {
                'value': 147,
                'name': 'must'
              },
              {
                'value': 102,
                'name': 'other'
              }
            ]
          }
        ]
      };
    }, 1);
  }

}
