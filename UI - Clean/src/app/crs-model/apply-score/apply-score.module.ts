import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplyScoreComponent } from 'app/crs-model/apply-score/apply-score.component';
import { RouterModule } from '@angular/router';
import { BellCurveModule } from '../../components/bell-curve/bell-curve.module';
import { BellCurveComponent } from '../../components/bell-curve/bell-curve.component';
import { TransformScorePipe } from './transform-score.pipe';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BellCurveModule,
    RouterModule.forChild([{
      path: '',
      component: ApplyScoreComponent
    }]),
  ],
  declarations: [ApplyScoreComponent, TransformScorePipe]
})
export class ApplyScoreModule { }
