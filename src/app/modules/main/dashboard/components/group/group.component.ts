import { DeviceService } from 'src/app/services/device.service';
import { Component, OnDestroy } from '@angular/core';
import { Group } from 'src/app/types/group.type';
import { GroupService } from 'src/app/services/group.service';
import { Observable, Subject, map, shareReplay, takeUntil } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnDestroy {
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
    this.deviceService.fromDeviceEvent().subscribe((data) => {
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
