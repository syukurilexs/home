import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TimerService } from 'src/app/services/timer.service';
import { OptionE } from 'src/app/enums/option.enum';
import { DeviceOld, Timer } from 'src/app/types/device-old.type';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  devices: DeviceOld[] = [];

  constructor(
    private readonly router: Router,
    private readonly timerService: TimerService
  ) {
    this.getTimer();
  }

  getTimer() {
    this.timerService.getAll().subscribe((data) => {
      this.devices = data;
    });
  }

  onDelete(deviceId: number, id: number) {
    // Remove from database
    this.timerService.deleteBy(id).subscribe((data) => {
      /** Remove loaded device locally */
      const deviceIdx = this.devices.findIndex((x) => x.id === deviceId);

      if (deviceIdx !== undefined && deviceIdx > -1) {
        const timerIdx = this.devices[deviceIdx].timers?.findIndex(
          (x) => x.id === id
        );

        if (timerIdx !== undefined && timerIdx > -1) {
          this.devices[deviceIdx].timers?.splice(timerIdx, 1);

          // if device no timer after an item of timer deleted, remove the device as well
          if (this.devices[deviceIdx].timers?.length === 0) {
            this.devices.splice(deviceIdx, 1);
          }
        }
      }

      alert('Deleted');
    });
  }

  onClickedAdd() {
    this.router.navigate(['/admin/timer/add']);
  }

  onChange(deviceId: number, timer: Timer) {
    this.devices = this.devices.map((device) => {
      if (device.id === deviceId) {
        device.timers = device.timers?.map((x) => {
          if (x.id === timer.id) {
            x.option =
              x.option === OptionE.Disable ? OptionE.Enable : OptionE.Disable;
          }

          return x;
        });
      }

      return device;
    });

    this.timerService.enableOption(timer).subscribe();
  }

  onEdit(deviceId: number, timerId: number) {
    this.router.navigate(['/admin/timer/edit/', timerId, 'device', deviceId]);
  }
}
