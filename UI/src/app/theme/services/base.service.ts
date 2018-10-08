import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Headers, RequestOptions, Response } from '@angular/http';

import { appVariables } from './../../app.constants';
import { HttpService } from '../../theme/services/http.service';
import { CustomErrorHandlerService } from './custom-error-handler.service';
import { Error } from '../interfaces/error.interface';
import { ToastNotificationInterface } from './toast-notification.interface';
import { ServerResponse } from '../interfaces/server-response.interface';
import { HelperService } from './helper.service';


@Injectable()
export class BaseService {
    constructor(public http: HttpService, public errorHandler: CustomErrorHandlerService,
        public helperService: HelperService) {

    }
    get(url) {
        this.helperService.startLoader();
        return this.http.get(url).map((res: Response) => {
            return this.handleResponse(res);
        }).catch((error: Response) => Observable.throw(this.errorHandler.tryParseError(error)))
            .finally(() => {
                this.helperService.stopLoader();
            });
    }

    post(url, postBody: any, options?: RequestOptions) {
        this.helperService.startLoader();
        if (options) {
            return this.http.post(url, postBody, options)
                .map((res: Response) => {
                    return this.handleResponse(res);
                })
                .catch((error: Response) => Observable.throw(error))
                .finally(() => {
                    this.helperService.stopLoader();
                });
        } else {
            return this.http.post(url, postBody)
                .map((res: Response) => {
                    return this.handleResponse(res);
                })
                .catch((error: Response) => Observable.throw(error))
                .finally(() => {
                    this.helperService.stopLoader();
                });
        }

    }
    delete(url, postBody: any) {
        this.helperService.startLoader();
        return this.http.delete(url).map((res: Response) => {
            return this.handleResponse(res);
        }).catch((error: Response) => Observable.throw(error))
            .finally(() => {
                this.helperService.stopLoader();
            });
    }
    put(url, putData) {
        this.helperService.startLoader();
        return this.http.put(url, putData).map((res: Response) => {
            return this.handleResponse(res);
        }).catch((error: Response) => Observable.throw(error))
            .finally(() => {
                this.helperService.stopLoader();
            });
    }

    upload(url: string, file: File) {
        const formData: FormData = new FormData();
        if (file) {
            formData.append('files', file, file.name);
        }
        this.helperService.shouldAddContentTypeHeader = false;
        return this.post(url, formData);
    }

    formUrlParam(url, data) {
        let queryString: string = '';
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (!queryString) {
                    queryString = `?${key}=${data[key]}`;
                } else {
                    queryString += `&${key}=${data[key]}`;
                }
            }
        }
        return url + queryString;
    }

    handleResponse(res: Response): ServerResponse {
        this.refreshToken(res);
        const data = res.json();
        if (data.error) {
            const error: Error = { error: data.error, message: data.message };
            throw new Error(this.errorHandler.parseCustomServerErrorToString(error));
        } else {
            return data;
        }
    }

    refreshToken(res: Response) {
        const token = res.headers.get(appVariables.accessTokenServer);
        if (token) {
            localStorage.setItem(appVariables.accessTokenLocalStorage, `${token}`);
        }
    }

}
