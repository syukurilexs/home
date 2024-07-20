import { Component } from '@angular/core';
import { Device } from '../../../../../types/device.type';
import { DeviceE } from '../../../../../enums/device-type.enum';
import { Router } from '@angular/router';
import { DeviceService } from '../../../../../services/device.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { getHandsetEvent } from '../../../../../utils/common';
import { Subject } from 'rxjs';
import { Light } from '../../../../../types/light.type';
import { Suis } from '../../../../../types/suis.type';
import { MatIcon } from '@angular/material/icon';
import { InfoComponent } from '../info/info.component';
import { ListUpdateComponent } from '../../../../../components/list-update/list-update.component';
import { NgClass } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatIcon,
    MatMiniFabButton,
    InfoComponent,
    NgClass,
    ListUpdateComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  devices: Device[] = [];
  device!: Device;
  deviceType: DeviceE = DeviceE.Switch;
  isHandset = false;

  constructor(
    private router: Router,
    private deviceService: DeviceService,
    breakpointObserver: BreakpointObserver,
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
        this.deviceType = DeviceE.Contact;
        break;

      default:
        this.getAllDeviceByType(DeviceE.Switch);
        this.deviceType = DeviceE.Switch;
        break;
    }

    getHandsetEvent(breakpointObserver, new Subject<void>()).subscribe(
      (x) => (this.isHandset = x),
    );
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
