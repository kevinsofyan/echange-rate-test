import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

export interface optionHeaders {
    key: string;
    value: string;
}

@Injectable({
  providedIn: 'root'
})
export class BaseService {

    protected constructor(
        protected http: HttpClient,
        protected router: Router,
    ) {
    }

    protected getAPI<T>(url: string, reload?: boolean, optionHeaders?: Array<optionHeaders>): Observable<T> {
        return this.http.cache(reload).get<T>(`${url}`, {
        }).pipe(tap(),
            catchError(this.handleError()));
    }

    protected handleError() {
        return (error: HttpErrorResponse): Observable<any> => {
            if (error.status === 401) {
                return throwError(error.message);
            }
        };
    }

    protected optionHeaders(optionHeaders ?: Array<optionHeaders>): HttpHeaders {
        let headers = new HttpHeaders({
            'Accept': '*',
            'Accept-Language': sessionStorage.getItem('language') || localStorage.getItem('language') || 'id-ID',
            'X-User-Agent': '*'
        });
        if (!!optionHeaders) {
            for (let i=0; i<optionHeaders.length; i++) {
                headers = headers.append(optionHeaders[i].key, optionHeaders[i].value);
            }
        }
        return headers;
    }
}
