import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms.component';
import {RouterModule} from '@angular/router';
import {FormsRoutes} from './forms.routing';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FormsRoutes),
    SharedModule
  ],
  declarations: [FormsComponent]
})
export class FormsModule { }
