import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class WizardService {
  public activeTab: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  public isLite: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor() {
  }
}
