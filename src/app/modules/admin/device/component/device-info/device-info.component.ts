import { Device } from 'src/app/utils/types/device.type';
import { Component, Input } from '@angular/core';
import { DeviceType } from 'src/app/utils/enums/device-type.enum';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.scss']
})
export class DeviceInfoComponent {
  @Input() device: Device | undefined = undefined;

  DeviceType = DeviceType;
}
