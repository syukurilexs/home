import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimerRoutingModule } from './timer-routing.module';
import { TimerComponent } from './timer.component';
import { ListComponent } from './list/list.component';
import { CompListEditDeleteComponent } from 'src/app/components/comp-list-edit-delete/comp-list-edit-delete.component';
import { MatModule } from 'src/app/mat.module';
import { InfoComponent } from './components/info/info.component';
import { CreateComponent } from './create/create.component';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

@NgModule({
  declarations: [
    TimerComponent,
    ListComponent,
    InfoComponent,
    CreateComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    TimerRoutingModule,
    CompListEditDeleteComponent,
    MatModule,
    ReactiveFormsModule,
    NgxMatTimepickerModule,
  ],
})
export class TimerModule {}
