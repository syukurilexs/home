import { DeviceType } from './../../../../utils/enums/device-type.enum';
import { DeviceService } from '../../../../services/device.service';
import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Device } from 'src/app/utils/types/device.type';
import { BreakpointObserver } from '@angular/cdk/layout';
import { getHandsetEvent } from 'src/app/utils/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
})
export class DeviceListComponent {
  devices: Device[] = [];
  device: Device | undefined = undefined;
  deviceType: DeviceType = DeviceType.Switch;
  isHandset = false;

  constructor(
    private router: Router,
    private deviceService: DeviceService,
    breakpointObserver: BreakpointObserver
  ) {
    switch (true) {
      case /light/.test(router.url):
        this.getAllDeviceByType(DeviceType.Light);
        this.deviceType = DeviceType.Light;
        break;
      case /fan/.test(router.url):
        this.getAllDeviceByType(DeviceType.Fan);
        this.deviceType = DeviceType.Fan;
        break;

      default:
        this.getAllDeviceByType(DeviceType.Switch);
        this.deviceType = DeviceType.Switch;
        break;
    }
    
    getHandsetEvent(breakpointObserver, new Subject<void>).subscribe(x => this.isHandset = x);
  }

  onAddDevice() {
    if (this.deviceType === DeviceType.Switch) {
      this.router.navigate(['admin/device/add/form-switch']);
    } else {
      this.router.navigate(['admin/device/add/form']);
    }
  }

  getAllDevice() {
    this.deviceService.getAll().subscribe((devices) => {
      this.devices = devices;
    });
  }

  getAllDeviceByType(type: DeviceType | undefined) {
    if (type !== undefined)
      this.deviceService.getAllByType(type).subscribe((devices) => {
        this.devices = devices;
      });
  }

  onClickedDelete(id: number) {
    const device = this.devices.find((data) => data.id == id);
    this.deviceService.deleteById(id).subscribe((data) => {
      alert('Deleted');
      this.getAllDeviceByType(device?.type);
    });
  }

  onClickedEdit(id: number) {
    const device = this.devices.find((data) => data.id == id);

    if (device?.type === DeviceType.Switch) {
      this.router.navigate(['admin/device/edit/form-switch', id]);
    } else {
      this.router.navigate(['admin/device/edit/form', id]);
    }
  }

  onClickedInfo(id: number) {
    this.deviceService.getById(id).subscribe((data) => {
      this.device = data;
    });
  }
}
