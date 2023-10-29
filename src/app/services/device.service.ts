import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { catchError, map, Observable, throwError } from 'rxjs';
import { DeviceType } from '../utils/enums/device-type.enum';
import { State } from '../utils/enums/state.enum';
import { Action, Device } from '../utils/types/device.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  url = environment.apiUrl;

  constructor(private http: HttpClient, private socket: Socket) {}

  getAll() {
    return this.http
      .get<Device[]>(this.url + '/device')
      .pipe(catchError(this.handleError));
  }

  getAllByType(type: DeviceType) {
    return this.http
      .get<Device[]>(this.url + '/device?type=' + DeviceType[type])
      .pipe(catchError(this.handleError));
  }

  getAllAction() {
    return this.http
    .get<Action[]>(this.url + '/device/action')
    .pipe(catchError(this.handleError))
  }

  create(value: Partial<{ name: null; type: null }>) {
    return this.http
      .post(this.url + '/device', value)
      .pipe(catchError(this.handleError));
  }

  createSwitch(value: Partial<{ name: null; type: null }>) {
    return this.http
      .post(this.url + '/device/switch', value)
      .pipe(catchError(this.handleError));
  }

  deleteById(id: number) {
    return this.http
      .delete(this.url + '/device/' + id)
      .pipe(catchError(this.handleError));
  }

  getById(id: DeviceType) {
    return this.http
      .get<Device>(this.url + '/device/' + id)
      .pipe(catchError(this.handleError));
  }

  updateById(id: number, value: any) {
    return this.http
      .patch(this.url + '/device/' + id, value)
      .pipe(catchError(this.handleError));
  }

  updateSwitchById(id: number, value: Partial<{ name: null; type: null }>) {
    return this.http
      .patch(this.url + '/device/switch/' + id, value)
      .pipe(catchError(this.handleError));
  }

  updateState(id: number, state: State) {
    return this.http
      .patch(this.url + '/device/' + id + '/state', { state })
      .pipe(catchError(this.handleError));
  }

  fromDeviceEvent(): Observable<Device> {
    return this.socket.fromEvent('state.change');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
