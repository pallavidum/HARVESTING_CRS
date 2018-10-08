import {Directive, Input, Output, ElementRef, EventEmitter} from '@angular/core';

import 'jquery-slimscroll';

@Directive({
  selector: '[baSlimScroll]'
})
export class BaSlimScroll {

  @Input() public baSlimScrollOptions:Object;

  constructor(public _elementRef:ElementRef) {
  }

  ngOnChanges(changes) {
    this._scroll();
  }

  public _scroll() {
    this._destroy();
    this._init();
  }

  public _init() {
    //jQuery(this._elementRef.nativeElement).slimScroll(this.baSlimScrollOptions);
    (this._elementRef.nativeElement).slimScroll(this.baSlimScrollOptions);
  }

  public _destroy() {
    //jQuery(this._elementRef.nativeElement).slimScroll({ destroy: true });
    (this._elementRef.nativeElement).slimScroll({ destroy: true });
  }
}
