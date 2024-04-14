import { DeviceFormSwitchComponent } from './device-form-switch/device-form-switch.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceFormComponent } from './device-form/device-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceComponent } from './device.component';
import { DeviceFormContactComponent } from './device-form-contact/device-form-contact.component';

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
        path: 'contact',
        component: DeviceListComponent,
      },
      {
        path: 'add/light',
        component: DeviceFormComponent,
      },
      {
        path: 'add/fan',
        component: DeviceFormComponent,
      },
      {
        path: 'add/switch',
        component: DeviceFormSwitchComponent,
      },
      {
        path: 'add/contact',
        component: DeviceFormContactComponent,
      },
      {
        path: 'edit/light/:id',
        component: DeviceFormComponent,
      },
      {
        path: 'edit/fan/:id',
        component: DeviceFormComponent,
      },
      {
        path: 'edit/switch/:id',
        component: DeviceFormSwitchComponent
      },
      {
        path: 'edit/contact/:id',
        component: DeviceFormContactComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceRoutingModule {}
