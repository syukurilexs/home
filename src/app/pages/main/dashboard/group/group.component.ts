import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Subject, Observable, map, shareReplay, takeUntil } from 'rxjs';
import { DeviceService } from '../../../../services/device.service';
import { GroupService } from '../../../../services/group.service';
import { Group } from '../../../../types/group.type';
import { NgClass } from '@angular/common';
import { ItemComponent } from './item/item.component';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [NgClass,ItemComponent],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent {
groups: Group[] = [];
  destroyed = new Subject<void>();
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
      takeUntil(this.destroyed)
    );
  isHandset = false;

  constructor(
    private groupService: GroupService,
    private readonly deviceService: DeviceService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.getGroup();
    this.fromDeviceEvent();
    
    this.isHandset$.subscribe((x) => {
      this.isHandset = x;
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroyed.next();
    this.destroyed.complete();
  }

  getGroup() {
    this.groupService.getAll().subscribe((data) => {
      // Filter and get only group with device. Skip for empty device
      this.groups = data.filter((x) => x.devices.length > 0);
    });
  }

  fromDeviceEvent() {
    this.deviceService.fromDeviceEvent()?.subscribe((data) => {
      this.groups.map((group) => {
        group.devices.map((device) => {
          if (data.id === device.id) {
            device.state = data.state;
          }
          return device;
        });
        return group;
      });
    });
  }
}
