import { Component, Input } from '@angular/core';
import { Device } from '../../../../../types/device.type';
import { DeviceE } from '../../../../../enums/device-type.enum';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [MatCard,MatCardContent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {
  @Input() device!: Device; 

  DeviceType = DeviceE;
}
