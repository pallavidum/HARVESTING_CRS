import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComposeEmailComponent } from './compose-email.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";

export const ComposeEmailRoutes: Routes = [
  {
    path: '',
    component: ComposeEmailComponent,
    data: {
      breadcrumb: 'Compose Email',
      status: false
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComposeEmailRoutes),
    SharedModule
  ],
  declarations: [ComposeEmailComponent]
})
export class ComposeEmailModule { }
