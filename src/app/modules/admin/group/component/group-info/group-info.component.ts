import { Component, Input } from '@angular/core';
import { Device } from 'src/app/utils/types/device.type';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.scss']
})
export class GroupInfoComponent {
  @Input() devices: Device[] = [];

}
