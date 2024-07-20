import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { DeviceE } from '../../../../../enums/device-type.enum';
import { Router, RouterModule, } from '@angular/router';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [MatCard],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
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
