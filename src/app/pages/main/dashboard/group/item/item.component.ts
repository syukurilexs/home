import { Component, Input } from '@angular/core';
import { StateE } from '../../../../../enums/state.enum';
import { DeviceOld } from '../../../../../types/device-old.type';
import { DeviceE } from '../../../../../enums/device-type.enum';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DeviceService } from '../../../../../services/device.service';
import { Group } from '../../../../../types/group.type';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { TitleCasePipe } from '@angular/common';
import { MatFabButton } from '@angular/material/button';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatIcon,
    MatFabButton,
    TitleCasePipe,
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {
  @Input() group!: Group;

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private deviceService: DeviceService,
  ) {
    iconRegistry.addSvgIcon(
      'fan',
      sanitizer.bypassSecurityTrustResourceUrl('icons/fan.svg'),
    );

    iconRegistry.addSvgIcon(
      'light',
      sanitizer.bypassSecurityTrustResourceUrl('icons/light.svg'),
    );
  }

  convertIconString(type: DeviceE) {
    if (type === DeviceE.Fan) {
      return 'fan';
    } else {
      return 'light';
    }
  }

  onClicked(device: DeviceOld) {
    const state = device.state === StateE.Off ? StateE.On : StateE.Off;
    this.deviceService.updateState(device.id, state).subscribe((data) => {});

    this.group.devices.map((x) => {
      if (x.id === device.id) {
        x.state = state;
      }
      return x;
    });
  }

  isStateOn(state: StateE) {
    return state === StateE.On;
  }

  statusLabel(state: StateE) {
    return state === StateE.Off ? 'Off' : 'On';
  }
}
