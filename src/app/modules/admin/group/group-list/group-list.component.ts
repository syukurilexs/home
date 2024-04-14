import { GroupService } from './../../../../services/group.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { GroupType } from 'src/app/types/group.type';
import { DeviceOld } from 'src/app/types/device-old.type';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent {
  groups: GroupType[] = [];
  devices: DeviceOld[] = [];

  constructor(private router: Router, private groupService: GroupService) {
    this.getAll();
  }

  onAddGroup() {
    this.router.navigate(['/admin/group/add']);
  }

  getAll() {
    this.groupService.getAll().subscribe((data) => {
      this.groups = data;
    });
  }

  onClickedEdit(id: number) {
    this.router.navigate(['/admin/group/edit/', id]);
  }

  onClickedDelete(id: number) {
    this.groupService.deleteById(id).subscribe((data) => {
      this.getAll();
    });
  }

  onClickedInfo(id: number) {
    const group = this.groups.find((group) => group.id === id);
    if(group?.devices) {
      this.devices = group.devices;
    }
  }
}
