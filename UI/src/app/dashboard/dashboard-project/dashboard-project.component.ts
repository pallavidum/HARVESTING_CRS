import { Component, OnInit } from '@angular/core';
import {Todo} from '../../shared/todo/index';
import {TodoService} from '../../shared/todo/todo.service';
declare var $: any;
declare var Morris: any;

@Component({
  selector: 'app-dashboard-project',
  templateUrl: './dashboard-project.component.html',
  styleUrls: ['./dashboard-project.component.css']
})
export class DashboardProjectComponent implements OnInit {
  public items: Todo[] = [];
  public newTodoText: string;

  public content = ` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci? Consequuntur aspernatur at, eaque hic repellendus sit dicta consequatur quae, ut harum ipsam molestias maxime non nisi reiciendis eligendi! Doloremque quia pariatur harum ea amet quibusdam quisquam, quae, temporibus dolores porro doloribus.Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci? Consequuntur aspernatur at,`;
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
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.items = this.todoService.getTodoList();

    setTimeout(() => {
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
