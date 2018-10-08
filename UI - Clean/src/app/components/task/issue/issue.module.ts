import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IssueComponent} from './issue.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';

export const issueRoutes: Routes = [
  {
    path: '',
    component: IssueComponent,
    data: {
      breadcrumb: 'Task Issue',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(issueRoutes),
    SharedModule
  ],
  declarations: [IssueComponent]
})
export class IssueModule { }
