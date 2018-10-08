import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailInboxComponent } from './email-inbox.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";

export const EmailInboxRoutes: Routes = [
  {
    path: '',
    component: EmailInboxComponent,
    data: {
      breadcrumb: 'Email Inbox',
      status: false
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EmailInboxRoutes),
    SharedModule
  ],
  declarations: [EmailInboxComponent]
})
export class EmailInboxModule { }
