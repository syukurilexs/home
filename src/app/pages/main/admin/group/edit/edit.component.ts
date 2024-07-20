import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Group } from '../../../../../types/group.type';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../../../../../services/group.service';
import { Location } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { FormComponent } from './form/form.component';
import { MatMiniFabButton } from '@angular/material/button';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [MatIcon, FormComponent,MatMiniFabButton],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  title = 'Add Group';
  id!: number;
  id$!: Observable<number>;
  group!: Group;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private groupService: GroupService,
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
