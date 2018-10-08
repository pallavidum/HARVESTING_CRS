import { Component, OnInit } from '@angular/core';
import { WizardService } from './wizard.service';
import { ConfusionMatrixComponent } from './../confusion-matrix/confusion-matrix.component'
import { Router } from '@angular/router';
import { ConfigureModelService } from 'app/crs-model/shared/configure-model.service';
import { ConfigureModel } from 'app/crs-model/shared/configure-model';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {
  private activeTab: number;
  private isLite : boolean = false;
  constructor(private wizardService: WizardService,
    private router: Router,private sharedService:ConfigureModelService) {

  }

  ngOnInit() {
    this.wizardService.activeTab.subscribe((res: number) => {
      this.activeTab = res;
    });
    this.wizardService.isLite.subscribe((isLite:number)=>{
      console.log(isLite + ' from wizard service');
        this.isLite = isLite == 0 ? false:true;
    })
  }
  redirect(route: string) {
    this.router.navigate([route]);
  }
}
