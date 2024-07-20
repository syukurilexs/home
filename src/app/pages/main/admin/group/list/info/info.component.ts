import { Component, Input } from '@angular/core';
import { DeviceOld } from '../../../../../../types/device-old.type';
import { MatCard } from '@angular/material/card';
import { MatList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [MatCard, MatList, MatListItem],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  @Input() devices: DeviceOld[] = [];
}
