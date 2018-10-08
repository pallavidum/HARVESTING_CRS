import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {SharedModule} from '../../shared/shared.module';

export const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    data: {
      breadcrumb: 'User Profile',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(profileRoutes),
    SharedModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
