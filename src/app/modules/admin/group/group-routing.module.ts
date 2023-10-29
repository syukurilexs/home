import { GroupListComponent } from './group-list/group-list.component';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupComponent } from './group.component';

const routes: Routes = [
  {
    path: '',
    component: GroupComponent,
    children: [
      {
        path: 'add',
        component: EditGroupComponent,
      },
      {
        path: 'edit/:id',
        component: EditGroupComponent,
      },
      {
        path: '',
        component: GroupListComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule {}
