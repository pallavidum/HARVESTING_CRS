import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TabsComponent} from './tabs.component';
import {SharedModule} from '../../../shared/shared.module';

export const TabsRoutes: Routes = [
  {
    path: '',
    component: TabsComponent,
    data: {
      breadcrumb: 'Tabs',
      status: true
    }
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TabsRoutes),
    SharedModule
  ],
  declarations: [TabsComponent]
})
export class TabsModule { }
