import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { handleError } from '../commons/function';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivityLogService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getActivityLog(page: number, take: number = 10) {
    return this.http
      .get(this.url + `/activitylog?order=DESC&page=${page}&take=${take}`)
      .pipe(catchError(handleError));
  }
}
