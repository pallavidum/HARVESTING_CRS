import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginCheck implements CanActivate, CanActivateChild {
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (sessionStorage && sessionStorage.getItem('isLoggedIn')) {
      return Observable.of(true);
    } else {
      this.router.navigate(['authentication/login/with-bg-image']);
      return Observable.of(false);
    }
  }
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (sessionStorage && sessionStorage.getItem('isLoggedIn')) {
      return Observable.of(true);
    } else {
      this.router.navigate(['authentication/login/with-bg-image']);
      return Observable.of(false);
    }
  }
}
