import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DeviceService } from 'src/app/services/device.service';
import { DeviceType } from 'src/app/utils/enums/device-type.enum';
import { State } from 'src/app/utils/enums/state.enum';
import { Device } from 'src/app/utils/types/device.type';
import { Group } from 'src/app/utils/types/group.type';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss'],
})
export class GroupItemComponent {
  @Input() group!: Group;

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

  convertIconString(type: DeviceType) {
    if (type === DeviceType.Fan) {
      return 'fan';
    } else {
      return 'light';
    }
  }

  onClicked(device: Device) {
    const state = device.state === State.Off ? State.On : State.Off;
    this.deviceService.updateState(device.id, state).subscribe((data) => {});

    this.group.devices.map((x) => {
      if (x.id === device.id) {
        x.state = state;
      }
      return x;
    });
  }

  isStateOn(state: State) {
    return state === State.On;
  }

  statusLabel(state: State) {
    return state === State.Off ? 'Off' : 'On';
  }
}
