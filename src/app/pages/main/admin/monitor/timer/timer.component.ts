import { Component } from '@angular/core';
import { Job } from '../../../../../types/job.type';
import { TimerService } from '../../../../../services/timer.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
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
