import { Component } from '@angular/core';
import { ItemComponent } from './item/item.component';
import { Router, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { DeviceE } from '../../../../enums/device-type.enum';
import { DeviceOld } from '../../../../types/device-old.type';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [ItemComponent, RouterOutlet, RouterLinkActive,RouterModule],
  //imports: [],
  templateUrl: './device.component.html',
  styleUrl: './device.component.scss',
})
export class DeviceComponent {
  deviceType = DeviceE;

  devices: DeviceOld[] = [];

  constructor(private router: Router) {}

  // onAddDevice(device: DeviceE) {
  //   this.router.navigate(['admin/device/add/form']);
  // }
}
