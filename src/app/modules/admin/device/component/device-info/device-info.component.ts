import { Component, Input, input } from '@angular/core';
import { DeviceE } from 'src/app/enums/device-type.enum';
import { Device } from 'src/app/types/device.type';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.scss']
})
export class DeviceInfoComponent {
  @Input() device!: Device; 

  DeviceType = DeviceE;
}
