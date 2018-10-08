import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { WizardService } from '../../components/wizard/wizard.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  constructor(private title: Title, private router: Router,
    private wizard: WizardService) { }

  ngOnInit() {
    this.wizard.activeTab.next(-1);
    this.title.setTitle(`My Models | CRS | Harvesting`);
  }
  moveNext() {
    this.router.navigate(['crsmodel/create']);
  }
}
