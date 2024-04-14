import { DeviceService } from './../../../services/device.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceE } from '../../../enums/device-type.enum';
import { DeviceOld } from 'src/app/types/device-old.type';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent {
  deviceType = DeviceE;

  devices: DeviceOld[] = [];

  constructor(
    private router: Router,
    private deviceService: DeviceService,
  ) {}

  onAddDevice(device: DeviceE) {
    this.router.navigate(['admin/device/add/form']);
  }
}
