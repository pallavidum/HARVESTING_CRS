import {Directive, HostBinding} from '@angular/core';

import {BaThemeConfigProvider, isMobile} from '../../../theme';

@Directive({
  selector: '[baThemeRun]'
})
export class BaThemeRun {

  public _classes:Array<string> = [];
  @HostBinding('class') classesString:string;

  constructor(public _baConfig:BaThemeConfigProvider) {
  }

  public ngOnInit():void {
    this._assignTheme();
    this._assignMobile();
  }

  public _assignTheme():void {
    this._addClass(this._baConfig.get().theme.name);
  }

  public _assignMobile():void {
    if (isMobile()) {
      this._addClass('mobile');
    }
  }

  public _addClass(cls:string) {
    this._classes.push(cls);
    this.classesString = this._classes.join(' ');
  }
}
