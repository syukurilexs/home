import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'device',
        pathMatch: 'full',
      },
      {
        path: 'device',
        loadChildren: () =>
          import('./device/device.module').then((m) => m.DeviceModule),
      },
      {
        path: 'group',
        loadChildren: () =>
          import('./group/group.module').then((m) => m.GroupModule),
      },
      {
        path: 'scene',
        loadChildren: () =>
          import('./scene/scene.module').then((m) => m.SceneModule),
      },
      {
        path: 'timer',
        loadChildren: () =>
          import('./timer/timer.module').then((m) => m.TimerModule),
      },
      {
        path: 'monitor',
        loadChildren: () =>
          import('./monitor/monitor.module').then((m) => m.MonitorModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
