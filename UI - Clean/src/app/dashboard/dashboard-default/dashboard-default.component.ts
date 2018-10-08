import { Component, OnInit } from '@angular/core';
declare const $: any;
declare var Morris: any;

@Component({
  selector: 'app-dashboard-default',
  templateUrl: './dashboard-default.component.html',
  styleUrls: ['./dashboard-default.component.css']
})
export class DashboardDefaultComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
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
      Morris.Bar({
        element: 'morris-bar-chart',
        data: [{
          y: '2006',
          a: 100,
          b: 90,
          c: 60
        }, {
          y: '2007',
          a: 75,
          b: 65,
          c: 40
        }, {
          y: '2008',
          a: 50,
          b: 40,
          c: 30
        }, {
          y: '2009',
          a: 75,
          b: 65,
          c: 40
        }, {
          y: '2010',
          a: 50,
          b: 40,
          c: 30
        }, {
          y: '2011',
          a: 75,
          b: 65,
          c: 40
        }, {
          y: '2012',
          a: 100,
          b: 90,
          c: 40
        }],
        xkey: 'y',
        ykeys: ['a', 'b', 'c'],
        labels: ['A', 'B', 'C'],
        barColors: ['#5FBEAA', '#5D9CEC', '#cCcCcC'],
        hideHover: 'auto',
        gridLineColor: '#eef0f2',
        resize: true
      });
    }, 1);
  }

}
