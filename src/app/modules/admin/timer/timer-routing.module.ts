import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimerComponent } from './timer.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: '',
    component: TimerComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'add',
        component: CreateComponent,
      },
      {
        path: 'edit/:timerId/device/:deviceId',
        component: CreateComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimerRoutingModule {}
