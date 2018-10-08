import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Inject, Injectable, ReflectiveInjector } from '@angular/core';
import { Headers, Http, Request, RequestOptions, Response, XHRBackend } from '@angular/http';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { AppModule } from '../..';
import { HelperService } from './helper.service';

@Injectable()
export class HttpService extends Http {
    helperService: HelperService;
    constructor(backend: XHRBackend, options: RequestOptions) {
        super(backend, options);
        this.helperService = AppModule.injector.get(HelperService);
    }

    request(url: string | Request, options?: RequestOptions): Observable<Response> {
        const token = localStorage.getItem('accessToken');

        if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
            if (!options) {
                // let's make an option object
                options = new RequestOptions({ headers: new Headers() });
            }

            const isLogin = _.includes(url, '/token');
            if (isLogin && this.helperService.shouldAddContentTypeHeader) {
                options.headers.append('Content-Type', 'application/X-www-form-urlencoded');
            } else {
                const isContentTypeHeader = options.headers.get('Content-Type');
                if (!isContentTypeHeader && this.helperService.shouldAddContentTypeHeader) {
                    options.headers.append('Content-Type', 'application/json');
                }
                options.headers.append('Authorization', token);
            }
        } else {
            const isLogin = _.includes(url.url, '/token');
            if (isLogin && this.helperService.shouldAddContentTypeHeader) {
                url.headers.append('Content-Type', 'application/X-www-form-urlencoded');
            } else {
                const isContentTypeHeader = url.headers.get('Content-Type');
                if (!isContentTypeHeader && this.helperService.shouldAddContentTypeHeader) {
                    url.headers.append('Content-Type', 'application/json');
                }
                url.headers.append('Authorization', token);
            }

        }
        return super.request(url, options).catch(this.catchAuthError(this));
    }

    public catchAuthError(self: HttpService) {
        // we have to pass HttpService's own instance here as `self`
        return (res: Response) => {
            if (res.status === 401 || res.status === 403) {
                // if not authenticated
                localStorage.removeItem('currentUser');
                localStorage.removeItem('userToken');
                window.location.href = '#login';
            }
            return Observable.throw(res);
        };
    }
}
