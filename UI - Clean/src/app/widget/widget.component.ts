import {Component, OnInit, ViewEncapsulation} from '@angular/core';

declare var $: any;
declare var Morris: any;
import 'd3';
import * as c3 from 'c3';
import {TodoService} from '../shared/todo/todo.service';
import {Todo} from '../shared/todo/index';
import {fadeInOutTranslate} from '../shared/elements/animation';

@Component({
  moduleId: module.id,
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: [
    '../../../node_modules/c3/c3.min.css',
    '../../assets/icon/SVG-animated/svg-weather.css',
    '../../assets/css/chartist.css'
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeInOutTranslate]
})
export class WidgetComponent implements OnInit {
  lineChartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    series: [
      [12, 9, 7, 8, 5, 4, 6, 2, 3, 3, 4, 6],
      [4, 5, 3, 7, 3, 5, 5, 3, 4, 4, 5, 5],
      [5, 3, 4, 5, 6, 3, 3, 4, 5, 6, 3, 4],
      [3, 4, 5, 6, 7, 6, 4, 5, 6, 7, 6, 3]
    ]
  };

  content = ` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci? Consequuntur aspernatur at, eaque hic repellendus sit dicta consequatur quae, ut harum ipsam molestias maxime non nisi reiciendis eligendi! Doloremque quia pariatur harum ea amet quibusdam quisquam, quae, temporibus dolores porro doloribus.Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci? Consequuntur aspernatur at,`;
  timeline = [
    { caption: '16 Jan', date: new Date('2014, 1, 16'), selected: true, title: 'Horizontal Timeline', content: this.content },
    { caption: '28 Feb', date: new Date('2014, 2, 28'), title: 'Event title here', content: this.content },
    { caption: '20 Mar', date: new Date('2014, 3, 20'), title: 'Event title here', content: this.content },
    { caption: '20 May', date: new Date('2014, 5, 20'), title: 'Event title here', content: this.content },
    { caption: '09 Jul', date: new Date('2014, 7, 9'), title: 'Event title here', content: this.content },
    { caption: '30 Aug', date: new Date('2014, 8, 30'), title: 'Event title here', content: this.content },
    { caption: '15 Sep', date: new Date('2014, 9, 15'), title: 'Event title here', content: this.content },
    { caption: '01 Nov', date: new Date('2014, 11, 1'), title: 'Event title here', content: this.content },
    { caption: '10 Dec', date: new Date('2014, 12, 10'), title: 'Event title here', content: this.content },
    { caption: '29 Jan', date: new Date('2015, 1, 19'), title: 'Event title here', content: this.content },
    { caption: '3 Mar', date: new Date('2015,  3,  3'), title: 'Event title here', content: this.content },
  ];

  public items: Todo[] = [];
  public newTodoText: string;

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.items = this.todoService.getTodoList();

    setTimeout(() => {
      $('.resource-barchart1').sparkline([5, 6, 9, 7, 8, 4, 6], {
        type: 'bar',
        barWidth: '6px',
        height: '32px',
        barColor: '#1abc9c',
        tooltipClassname: 'abc'
      });

      $('.resource-barchart2').sparkline([6, 4, 8, 7, 9, 6, 5], {
        type: 'bar',
        barWidth: '6px',
        height: '32px',
        barColor: '#1abc9c',
        tooltipClassname: 'abc'
      });

      Morris.Area({
        element: 'morris-extra-area',
        data: [{
          period: '2010',
          iphone: 0,
          ipad: 0,
          itouch: 0
        }, {
          period: '2011',
          iphone: 50,
          ipad: 15,
          itouch: 5
        }, {
          period: '2012',
          iphone: 20,
          ipad: 50,
          itouch: 65
        }, {
          period: '2013',
          iphone: 60,
          ipad: 12,
          itouch: 7
        }, {
          period: '2014',
          iphone: 30,
          ipad: 20,
          itouch: 120
        }, {
          period: '2015',
          iphone: 25,
          ipad: 80,
          itouch: 40
        }, {
          period: '2016',
          iphone: 10,
          ipad: 10,
          itouch: 10
        }


        ],
        lineColors: ['#fb9678', '#7E81CB', '#01C0C8'],
        xkey: 'period',
        ykeys: ['iphone', 'ipad', 'itouch'],
        labels: ['Site A', 'Site B', 'Site C'],
        pointSize: 0,
        lineWidth: 0,
        resize: true,
        fillOpacity: 0.8,
        behaveLikeLine: true,
        gridLineColor: '#5FBEAA',
        hideHover: 'auto'

      });

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

      Morris.Area({
        element: 'morris-area',
        data: [{
          period: '2010',
          iphone: 0
        }, {
          period: '2011',
          iphone: 50
        }, {
          period: '2012',
          iphone: 20
        }, {
          period: '2013',
          iphone: 60
        }, {
          period: '2014',
          iphone: 30
        }, {
          period: '2015',
          iphone: 25
        }, {
          period: '2016',
          iphone: 10
        }
        ],
        lineColors: ['rgb(26, 188, 156)'],
        xkey: 'period',
        ykeys: ['iphone'],
        labels: ['Site A'],
        pointSize: 0,
        lineWidth: 0,
        resize: true,
        fillOpacity: 0.8,
        behaveLikeLine: true,
        gridLineColor: '#5FBEAA',
        hideHover: 'auto'
      });

      const chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: [
            ['data2', 2, 10, 4, 15, 25]
          ],

        },
        axis: {
          rotated: false
        },
        color: {
          pattern: ['#2ecc71']
        }
      });

    }, 1);
  }

  getNotDeleted() {
    return this.items.filter((item: any) => {
      return !item.deleted
    })
  }

  addToDoItem($event) {
    if (($event.which === 1 || $event.which === 13) && this.newTodoText.trim() != '') {
      this.items.unshift({
        text: this.newTodoText,
      });
      this.newTodoText = '';
    }
  }
}
