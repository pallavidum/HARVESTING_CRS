import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Column, ConfigureModel, Categorical, Numerical, Model } from '../../../../configure-model.model';
import { ConfigureModelService } from '../../../../configure-model.service';
import { Subscription } from 'rxjs';
import { DecimalPipe } from '@angular/common';

import { Chart } from 'chart.js';

declare var Plotly: any;

@Component({
  selector: 'ngt-feature-info',
  templateUrl: './feature-info.component.html',
  styleUrls: ['./feature-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureInfoComponent implements OnInit, OnDestroy {
  @Input() column: Column;
  @Input() modelConfiguration: ConfigureModel;
  @Input() index: number;
  columnExpanded: boolean = false;
  isLoading: boolean = true;
  featureInfo: Categorical | Numerical;
  currentModel: Model;
  private featureInfoSubscription: Subscription;
  constructor(private configService: ConfigureModelService,
    private cdrRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.configService.getModelIndex().subscribe(res => {
      this.currentModel = this.modelConfiguration.models[res];
      const selectedDataSet = this.modelConfiguration.dataSets.filter(x => x.isSelected)[0];
      if (this.currentModel.coloumnsSelected) {
        selectedDataSet.columns[this.index].isDeleted =
          !(this.currentModel.coloumnsSelected.indexOf(selectedDataSet.columns[this.index].name) > -1);
      }
      this.loadFeatureinfo();
    });
  }
  generateChart(): any {
    const conf = {
      'type': 'bar',
      'data': {
        'labels': [],
        'datasets': [
          {
            'label': '',
            'data': [],
            'fill': true,
            'backgroundColor': '#9bacb9',
            'borderWidth': 1,
          },
        ],
      },
      'options': {
        'responsive': true,
        'scales': {
          'yAxes': [
            {
              'ticks': {
                'beginAtZero': true,
              },
            },
          ],
        },
      },
    };
    conf.data.labels = [];
    conf.data.datasets[0].data = [];
    if ((<Categorical>this.featureInfo).x_vals !== undefined) {
      const feature = <Categorical>this.featureInfo;
      if (feature.x_vals !== undefined) {
        for (const itm of feature.x_vals) {
          conf.data.labels.push(itm);
          conf.data.datasets[0].data.push({ x: itm, y: feature.y_vals[feature.x_vals.indexOf(itm)] });
        }
        conf.data.datasets[0].label = feature.feature;
        return new Chart(document.getElementById(feature.feature), conf);
      }
    } else {
      const feature = <Numerical>this.featureInfo;
      if (feature.x_hist !== undefined) {
        const trace = {
          x: feature.x_hist,
          type: 'histogram',
          marker: {
            color: 'rgb(54, 88, 114)',
            line: {
              color: 'rgb(28, 43, 54)',
              width: 1,
            },
          },
          opacity: 0.5,
          name: feature.feature,
        };
        Plotly.newPlot(feature.feature, [trace], { displayModeBar: false });
      }
    }
  }
  loadFeatureinfo(): void {
    this.isLoading = true;
    const featureType = this.column.isNumeric ? 1 : 0;
    const selectedColumn = this.modelConfiguration.dataSets.filter(x => x.isSelected)[0].predictionColumn;
    this.featureInfoSubscription =
      this.configService.featureInfo(featureType, this.column.name, this.modelConfiguration.selectedDataSet,
        selectedColumn)
        .subscribe((res: Categorical | Numerical) => {
          this.featureInfo = res;
          this.isLoading = false;
          this.cdrRef.detectChanges();
        });
  }
  ngOnDestroy(): void {
    this.featureInfoSubscription.unsubscribe();
  }
}
