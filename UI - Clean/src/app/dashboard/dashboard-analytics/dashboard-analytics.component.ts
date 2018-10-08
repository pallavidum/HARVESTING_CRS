import {Component, OnInit, ViewEncapsulation} from '@angular/core';
declare const $: any;
declare let d3: any;
declare var Morris: any;
import '../../../assets/echart/echarts-all.js';

@Component({
  selector: 'app-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: [
    './dashboard-analytics.component.css',
    '../../../assets/icon/SVG-animated/svg-weather.css',
    '../../../../node_modules/nvd3/build/nv.d3.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class DashboardAnalyticsComponent implements OnInit {
  lineChartOptions: any;
  lineChartData: any;
  pieChartOption: any;
  profitChartOption: any;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.lineChartOptions = {
        chart: {
          type: 'lineChart',
          height: 400,
          margin: {
            top: 50,
            left: 100
          },
          useInteractiveGuideline: true,
          showLegend: true,
          showYAxis: true,
          showXAxis: true,
          x: function (d) {
            return d.x;
          },
          y: function (d) {
            return d.y;
          },
          xAxis: {
            axisLabel: 'Time (ms)',
            tickFormat: function (d) {
              return d3.format(',r')(d);
            },
          },
          yAxis: {
            axisLabel: 'Voltage (v)',
            tickFormat: function (d) {
              return d3.format('.02f')(d);
            }
          }
        }
      };
      this.lineChartData = this.sinAndCos();

      Morris.Area({
        element: 'morris-site-visit',
        data: [{
          period: '2010',
          SiteA: 0,
          SiteB: 0,

        }, {
          period: '2011',
          SiteA: 130,
          SiteB: 100,

        }, {
          period: '2012',
          SiteA: 80,
          SiteB: 60,

        }, {
          period: '2013',
          SiteA: 70,
          SiteB: 200,

        }, {
          period: '2014',
          SiteA: 180,
          SiteB: 150,

        }, {
          period: '2015',
          SiteA: 105,
          SiteB: 90,

        }, {
          period: '2016',
          SiteA: 250,
          SiteB: 150,

        }],
        xkey: 'period',
        ykeys: ['SiteA', 'SiteB'],
        labels: ['Site A', 'Site B'],
        pointSize: 0,
        fillOpacity: 0.4,
        pointStrokeColors: ['#b4becb', '#01c0c8'],
        behaveLikeLine: true,
        gridLineColor: '#e0e0e0',
        lineWidth: 0,
        smooth: false,
        hideHover: 'auto',
        lineColors: ['#b4becb', '#01c0c8'],
        resize: true

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

      this.profitChartOption = {
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            const date = new Date(params.value[0]);
            const data = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
            return data + '<br/>' + params.value[1] + ', ' + params.value[2];
          },
          responsive: true
        },
        dataZoom: {
          show: true,
          start: 70
        },
        legend: {
          data: ['Profit']
        },
        grid: {
          y2: 80
        },
        xAxis: [{
          type: 'time',
          splitNumber: 10
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: 'Profit',
          type: 'line',
          showAllSymbol: true,
          symbolSize: function(value) {
            return Math.round(value[2] / 10) + 2;
          },
          data: (function() {
            const d: any = [];
            let len = 0;
            const now = new Date();
            while (len++ < 200) {
              const random1: any = (Math.random() * 30).toFixed(2);
              const random2: any = (Math.random() * 100).toFixed(2);
              d.push([ new Date(2014, 9, 1, 0, len * 10000), random1 - 0, random2 - 0 ]);
            }
            return d;
          })()
        }]
      };
    }, 1);

    setInterval(() => {
      $('.info-aapl span').each(function(index, elem) {
        $(elem).animate({
          height: generateNumber(1, 40)
        });
      });
    }, 1);
  }

  sinAndCos() {
    const sin = [], sin2 = [], cos = [];

    for (let i = 0; i < 100; i++) {
      sin.push({x: i, y: Math.sin(i / 10)});
      sin2.push({x: i, y: Math.sin(i / 10) * 0.25 + 0.5});
      cos.push({x: i, y: .5 * Math.cos(i / 10)});
    }

    return [
      {
        values: sin,
        key: 'Sine Wave',
        color: '#4C5667'
      },
      {
        values: cos,
        key: 'Cosine Wave',
        color: '#5FBEAA'
      },
      {
        values: sin2,
        key: 'Another sine wave',
        color: '#FF9F55',
        area: true
      }
    ];
  }

}

function generateNumber(min, max) {
  min = typeof min !== 'undefined' ? min : 1;
  max = typeof max !== 'undefined' ? max : 100;

  return Math.floor((Math.random() * max) + min);
}
