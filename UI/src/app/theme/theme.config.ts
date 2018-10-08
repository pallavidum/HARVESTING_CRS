import { Injectable } from '@angular/core';

import { BaThemeConfigProvider } from './theme.configProvider';
import { colorHelper } from './theme.constants';
import { colors } from './theme.colors';

@Injectable()
export class BaThemeConfig {
  themeColors: any;
  activeTheme: string;
  constructor(public _baConfig: BaThemeConfigProvider) {
    this.activeTheme = 'mint';
    this.themeColors = colors[this.activeTheme];
  }

  config() {
    this._baConfig.changeTheme({ name: this.activeTheme });

    const colorScheme = this.themeColors.colorScheme;

    this._baConfig.changeColors({
      default: this.themeColors.default,
      defaultText: this.themeColors.defaultText,
      border: this.themeColors.border,
      borderDark: this.themeColors.borderDark,

      primary: colorScheme.primary,
      info: colorScheme.info,
      success: colorScheme.success,
      warning: colorScheme.warning,
      danger: colorScheme.danger,

      primaryLight: colorHelper.tint(colorScheme.primary, 30),
      infoLight: colorHelper.tint(colorScheme.info, 30),
      successLight: colorHelper.tint(colorScheme.success, 30),
      warningLight: colorHelper.tint(colorScheme.warning, 30),
      dangerLight: colorHelper.tint(colorScheme.danger, 30),

      primaryDark: colorHelper.shade(colorScheme.primary, 15),
      infoDark: colorHelper.shade(colorScheme.info, 15),
      successDark: colorHelper.shade(colorScheme.success, 15),
      warningDark: colorHelper.shade(colorScheme.warning, 15),
      dangerDark: colorHelper.shade(colorScheme.danger, 15),

      dashboard: this.themeColors.dashboard,

      custom: {
        dashboardPieChart: colorHelper.hexToRgbA(this.themeColors.custom.dashboardPieChart, 0.8),
        dashboardLineChart: this.themeColors.custom.dashboardLineChart,
      },
    });
  }
}
