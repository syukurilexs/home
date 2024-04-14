import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceE } from 'src/app/enums/device-type.enum';

@Component({
  selector: 'app-device-item',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './device-item.component.html',
  styleUrls: ['./device-item.component.scss'],
})
export class DeviceItemComponent {
  @Input() type!: DeviceE;
  @Input() active: boolean = false;

  @Output() onClicked = new EventEmitter<DeviceE>();

  typeText: string = 'Lights';
  icon: string = 'light.svg';

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.type && this.type === DeviceE.Fan) {
      this.typeText = 'Fans';
      this.icon = 'fan.svg';
    } else if (this.type && this.type === DeviceE.Switch) {
      this.typeText = 'Switch';
      this.icon = 'switch.svg';
    } else if (this.type && this.type === DeviceE.Contact) {
      this.typeText = 'Contact'
      this.icon = 'switch.svg'
    }
  }

  onClick() {
    this.onClicked.emit(this.type);
    //this.router.navigate(['/admin/device']);
  }
}
