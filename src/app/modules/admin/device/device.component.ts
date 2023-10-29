import { DeviceService } from './../../../services/device.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceType } from '../../../utils/enums/device-type.enum';
import { Device } from 'src/app/utils/types/device.type';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent {
  haha = DeviceType;

  devices: Device[] = [];

  constructor(
    private router: Router,
    private deviceService: DeviceService,
  ) {}

  onAddDevice(device: DeviceType) {
    this.router.navigate(['admin/device/add/form']);
  }
}
