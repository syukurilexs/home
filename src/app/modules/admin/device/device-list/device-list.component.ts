import { DeviceE } from '../../../../enums/device-type.enum';
import { DeviceService } from '../../../../services/device.service';
import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { DeviceOld } from 'src/app/types/device-old.type';
import { BreakpointObserver } from '@angular/cdk/layout';
import { getHandsetEvent } from 'src/app/utils/common';
import { Subject } from 'rxjs';
import { Light } from 'src/app/types/light.type';
import { Suis } from 'src/app/types/suis.type';
import { Device } from 'src/app/types/device.type';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
})
export class DeviceListComponent {
  devices: Device[] = [];
  device!: Device;
  deviceType: DeviceE = DeviceE.Switch;
  isHandset = false;

  constructor(
    private router: Router,
    private deviceService: DeviceService,
    breakpointObserver: BreakpointObserver
  ) {
    switch (true) {
      case /light/.test(router.url):
        this.getAllDeviceByType(DeviceE.Light);
        this.deviceType = DeviceE.Light;
        break;
      case /fan/.test(router.url):
        this.getAllDeviceByType(DeviceE.Fan);
        this.deviceType = DeviceE.Fan;
        break;
      case /contact/.test(router.url):
        this.getAllDeviceByType(DeviceE.Contact);
        this.deviceType = DeviceE.Contact
        break;

      default:
        this.getAllDeviceByType(DeviceE.Switch);
        this.deviceType = DeviceE.Switch;
        break;
    }

    getHandsetEvent(breakpointObserver, new Subject<void>).subscribe(x => this.isHandset = x);
  }

  onAddDevice() {
    if (this.deviceType === DeviceE.Switch) {
      this.router.navigate(['admin/device/add/switch']);
    } else if (this.deviceType === DeviceE.Contact) {
      this.router.navigate(['admin/device/add/contact']);
    } else if (this.deviceType === DeviceE.Light) {
      this.router.navigate(['admin/device/add/light']);
    } else {
      this.router.navigate(['admin/device/add/fan']);
    }
  }

  getAllDevice() {
    this.deviceService.getAll<Device[]>().subscribe((devices) => {
      this.devices = devices;
    });
  }

  getAllDeviceByType(type: DeviceE | undefined) {
    if (type !== undefined)
      this.deviceService.getAllByType<Device[]>(type).subscribe((devices) => {
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


    if (device?.type === DeviceE.Switch) {
      this.router.navigate(['admin/device/edit/switch', id]);
    } else if (device?.type === DeviceE.Contact) {
      this.router.navigate(['admin/device/edit/contact', id]);
    } else if (device?.type === DeviceE.Light) {
      this.router.navigate(['admin/device/edit/light', id]);
    } else {
      this.router.navigate(['admin/device/edit/fan', id]);
    }
  }

  onClickedInfo(id: number) {
    this.deviceService.getById<Device>(id).subscribe((data) => {
      if (data.type === DeviceE.Light) {
        this.device = data as Light;
      } else if (data.type === DeviceE.Switch) {
        this.device = data as Suis;
      } else {
        this.device = data;
      }
    });
  }
}
