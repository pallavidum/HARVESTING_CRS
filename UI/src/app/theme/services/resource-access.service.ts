import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ResourceActionAccess } from '../interfaces';
import { appApiResources } from './../../app.constants';
import { BaseService } from './base.service';
import { ClaimsServerGetResponse } from './../interfaces/resource-action-access.interface';

@Injectable()
export class ResourceAccessService {
    constructor(public http: BaseService) { }

    getClaims(): Observable<ClaimsServerGetResponse> {
        return this.http.get(appApiResources.claim);
    }

    getClaimsByUserId(userId: string): Observable<ClaimsServerGetResponse> {
        return this.http.get(`${appApiResources.claim}/${userId}`);
    }

    addClaims(postBody: ResourceActionAccess): Observable<any> {
        return this.http.post(appApiResources.claim, postBody);
    }

    updateClaims(userId: string, postBody: ResourceActionAccess): Observable<any> {
        return this.http.put(`${appApiResources.claim}/${userId}`, postBody);
    }
}
