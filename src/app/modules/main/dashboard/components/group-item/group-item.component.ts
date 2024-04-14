import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DeviceService } from 'src/app/services/device.service';
import { DeviceE } from 'src/app/enums/device-type.enum';
import { StateE } from 'src/app/enums/state.enum';
import { DeviceOld } from 'src/app/types/device-old.type';
import { GroupType } from 'src/app/types/group.type';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss'],
})
export class GroupItemComponent {
  @Input() group!: GroupType;

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private deviceService: DeviceService
  ) {
    iconRegistry.addSvgIcon(
      'fan',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/fan.svg')
    );

    iconRegistry.addSvgIcon(
      'light',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/light.svg')
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
