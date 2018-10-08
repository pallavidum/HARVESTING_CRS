import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { EditorComponent } from './editor.component';
import {SharedModule} from '../../shared/shared.module';
import {EditorRoutes} from './editor.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EditorRoutes),
    SharedModule
  ],
  declarations: [EditorComponent]
})
export class EditorModule { }
