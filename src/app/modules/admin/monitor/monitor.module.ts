import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorComponent } from './monitor.component';
import { MatModule } from 'src/app/mat.module';
import { TimerComponent } from './component/timer/timer.component';
import { ActivityLogComponent } from './component/activity-log/activity-log.component';


@NgModule({
  declarations: [
    MonitorComponent,
    TimerComponent,
    ActivityLogComponent
  ],
  imports: [
    CommonModule,
    MonitorRoutingModule,
    MatModule
  ]
})
export class MonitorModule { }
