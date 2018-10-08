import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-inbox',
  templateUrl: './email-inbox.component.html',
  styleUrls: ['./email-inbox.component.css']
})
export class EmailInboxComponent implements OnInit {
  tabControl = 'e-inbox';
  constructor() { }

  ngOnInit() {
  }

  changeTabRelation(tab) {
    this.tabControl = tab;
  }

}
