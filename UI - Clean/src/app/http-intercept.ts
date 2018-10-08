import { Injectable } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { HttpEvent } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { environment } from "environments";

@Injectable()
export class HTTPClientInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    const url = environment.apiHost;
    if(req.url.search('intercept=1')<0){
    req = req.clone({
      url: url + req.url
    });
  }
    return next.handle(req);
  }
}