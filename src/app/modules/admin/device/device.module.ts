import { CompListEditDeleteComponent } from 'src/app/components/comp-list-edit-delete/comp-list-edit-delete.component';
import { DeviceService } from './../../../services/device.service';
import { DeviceListComponent } from './device-list/device-list.component';
import { MatModule } from './../../../mat.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceRoutingModule } from './device-routing.module';
import { DeviceComponent } from './device.component';
import { DeviceItemComponent } from './component//device-item/device-item.component';
import { DeviceFormComponent } from './device-form/device-form.component';
import { DeviceInfoComponent } from './component/device-info/device-info.component';
import { DeviceFormSwitchComponent } from './device-form-switch/device-form-switch.component';
import { DeviceFormContactComponent } from './device-form-contact/device-form-contact.component';

@NgModule({
  declarations: [
    DeviceFormComponent,
    DeviceListComponent,
    DeviceComponent,
    DeviceInfoComponent,
    DeviceFormSwitchComponent,
    DeviceFormContactComponent
  ],
  imports: [
    CommonModule,
    DeviceRoutingModule,
    DeviceItemComponent,
    MatModule,
    CompListEditDeleteComponent,
  ],
  providers: [DeviceService],
})
export class DeviceModule {}
