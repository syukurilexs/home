import { DeviceFormSwitchComponent } from './device-form-switch/device-form-switch.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceFormComponent } from './device-form/device-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceComponent } from './device.component';

const routes: Routes = [
  {
    path: '',
    component: DeviceComponent,
    children: [
      {
        path: 'fan',
        component: DeviceListComponent,
      },
      {
        path: 'light',
        component: DeviceListComponent,
      },
      {
        path: 'switch',
        component: DeviceListComponent,
      },
      {
        path: 'add/form',
        component: DeviceFormComponent,
      },
      {
        path: 'add/form-switch',
        component: DeviceFormSwitchComponent,
      },
      {
        path: 'edit/form/:id',
        component: DeviceFormComponent,
      },
      {
        path: 'edit/form-switch/:id',
        component: DeviceFormSwitchComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceRoutingModule {}
