import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailReadComponent } from './email-read.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";

export const EmailReadRoutes: Routes = [
  {
    path: '',
    component: EmailReadComponent,
    data: {
      breadcrumb: 'Email Read',
      status: false
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EmailReadRoutes),
    SharedModule
  ],
  declarations: [EmailReadComponent]
})
export class EmailReadModule { }
