import { MatModule } from './../../../mat.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupFormComponent } from './component/group-form/group-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompListEditDeleteComponent } from 'src/app/components/comp-list-edit-delete/comp-list-edit-delete.component';
import { GroupInfoComponent } from './component/group-info/group-info.component';


@NgModule({
  declarations: [
    GroupComponent,
    EditGroupComponent,
    GroupListComponent,
    GroupFormComponent,
    GroupInfoComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    MatModule,
    ReactiveFormsModule,
    CompListEditDeleteComponent
  ]
})
export class GroupModule { }
