import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { catchError, Observable, throwError } from 'rxjs';
import { DeviceE } from '../enums/device-type.enum';
import { StateE } from '../enums/state.enum';
import { DeviceOld } from '../types/device-old.type';
import { environment } from '../../environments/environment';
import { Suis } from '../types/suis.type';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  url = environment.apiUrl;

  constructor(private http: HttpClient, private socket: Socket) { }

  getAll<T>() {
    return this.http
      .get<T>(this.url + '/device')
      .pipe(catchError(this.handleError));
  }

  getAllByType<T>(type: DeviceE) {
    return this.http
      .get<T>(this.url + '/device?type=' + DeviceE[type])
      .pipe(catchError(this.handleError));
  }

  getAllAction<T>() {
    return this.http
      .get<T>(this.url + '/device/action')
      .pipe(catchError(this.handleError))
  }

  create(value: Partial<{ name: any; type: any}>) {
    return this.http
      .post(this.url + '/device', value)
      .pipe(catchError(this.handleError));
  }

  createSwitch(value: Suis) {
    return this.http
      .post(this.url + '/device/switch', value)
      .pipe(catchError(this.handleError));
  }

  createContact(value: Partial<{ name: any; type: any }>) {
    return this.http
      .post(this.url + '/device/contactsensor', value)
      .pipe(catchError(this.handleError))
  }

  deleteById(id: number) {
    return this.http
      .delete(this.url + '/device/' + id)
      .pipe(catchError(this.handleError));
  }

  getById<T>(id: DeviceE) {
    return this.http
      .get<T>(this.url + '/device/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateById(id: number, value: any) {
    return this.http
      .patch(this.url + '/device/' + id, value)
      .pipe(catchError(this.handleError));
  }

  updateSwitchById(id: number, value: Suis) {
    return this.http
      .patch(this.url + '/device/switch/' + id, value)
      .pipe(catchError(this.handleError));
  }

  updateContactById(id: number, value: Partial<{ name: any; type: any }>) {
    return this.http
      .patch(this.url + '/device/contactsensor' + id, value)
      .pipe(catchError(this.handleError))
  }

  updateState(id: number, state: StateE) {
    return this.http
      .patch(this.url + '/device/' + id + '/state', { state })
      .pipe(catchError(this.handleError));
  }

  fromDeviceEvent(): Observable<DeviceOld> {
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
