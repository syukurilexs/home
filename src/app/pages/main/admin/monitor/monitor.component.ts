import { Component } from '@angular/core';
import { MatTab, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { TimerComponent } from './timer/timer.component';

@Component({
  selector: 'app-monitor',
  standalone: true,
  imports: [MatTab, MatTabGroup, TimerComponent, ActivityLogComponent],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.scss',
})
export class MonitorComponent {}
