import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

export const EmailRoutes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'E-Email',
      status: false
    },
    children: [
      {
        path: 'compose-email',
        loadChildren: './compose-email/compose-email.module#ComposeEmailModule'
      },
      {
        path: 'email-inbox',
        loadChildren: './email-inbox/email-inbox.module#EmailInboxModule'
      },
      {
        path: 'email-read',
        loadChildren: './email-read/email-read.module#EmailReadModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EmailRoutes)
  ],
  declarations: []
})
export class EmailModule { }
