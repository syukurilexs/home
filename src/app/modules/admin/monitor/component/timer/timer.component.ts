import { Component } from '@angular/core';
import { TimerService } from 'src/app/services/timer.service';
import { Job } from 'src/app/types/job.type';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent {

  jobs: Job[] = [];

  constructor(private timerService: TimerService) {
    this.getJobs();
  }

  getJobs() {
    this.timerService.getJobs().subscribe( jobs => {
      this.jobs = jobs;
    });
  }
}
