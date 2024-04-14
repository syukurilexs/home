import { GroupType } from 'src/app/types/group.type';
import { GroupService } from './../../../../services/group.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss'],
})
export class EditGroupComponent {
  title = 'Add Group';
  id!: number;
  id$!: Observable<number>;
  group!: GroupType;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private groupService: GroupService
  ) {
    this.id$ = route.params.pipe(map((p) => p['id']));
  }

  ngOnInit(): void {
    this.id$.subscribe((id) => {
      if (id) {
        this.id = id;
        this.updateEdit();
      }
    });
  }

  back() {
    this.location.back();
  }

  updateEdit() {
    this.title = 'Edit Group';
  }
}
