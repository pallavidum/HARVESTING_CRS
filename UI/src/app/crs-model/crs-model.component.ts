import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crs-model',
  templateUrl: './crs-model.component.html',
  styleUrls: ['./crs-model.component.css']
})
export class CrsModelComponent implements OnInit {
  showWizard : boolean = true;
  constructor(private title: Title,private router:Router) {
  }
  
  ngOnInit() {
    this.title.setTitle(`Create Model :: CRS Harvesting`);
  }

}
