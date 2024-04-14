import { Component, Input } from '@angular/core';
import { DeviceOld } from 'src/app/types/device-old.type';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.scss']
})
export class GroupInfoComponent {
  @Input() devices: DeviceOld[] = [];

}
