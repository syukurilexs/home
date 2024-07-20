import { Component } from '@angular/core';
import { Group } from '../../../../../types/group.type';
import { DeviceOld } from '../../../../../types/device-old.type';
import { Router } from '@angular/router';
import { GroupService } from '../../../../../services/group.service';
import { MatIcon } from '@angular/material/icon';
import { ListUpdateComponent } from '../../../../../components/list-update/list-update.component';
import { InfoComponent } from './info/info.component';
import { MatMiniFabButton } from '@angular/material/button';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatIcon, ListUpdateComponent, InfoComponent, MatMiniFabButton],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  groups: Group[] = [];
  devices: DeviceOld[] = [];

  constructor(
    private router: Router,
    private groupService: GroupService,
  ) {
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
    if (group?.devices) {
      this.devices = group.devices;
    }
  }
}
