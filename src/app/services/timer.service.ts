import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTimer } from '../types/timer.type';
import { DeviceOld, Timer } from '../types/device-old.type';
import { environment } from '../../environments/environment';
import { JobType } from '../types/job.type';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getJobs() {
    return this.http.get<JobType[]>(this.url + '/timer/jobs');
  }

  deleteBy(id: number) {
    return this.http.delete(this.url + '/timer/' + id);
  }

  getAll() {
    return this.http.get<DeviceOld[]>(this.url + '/timer');
  }

  getById(id: number) {
    return this.http.get<Timer>(this.url + '/timer/' + id);
  }

  create(data: CreateTimer) {
    return this.http.post(this.url + '/timer', data);
  }

  updateById(data: CreateTimer,id: number) {
    return this.http.patch(this.url + '/timer/' + id, data);
  }

  enableOption(timer: Timer) {
    return this.http.patch(this.url + '/timer/' + timer.id + '/option', {
      option: timer.option,
    });
  }
}
