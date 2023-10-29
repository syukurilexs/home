import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { SceneComponent } from './scene.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: SceneComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'add',
        component: CreateComponent,
      },
      {
        path: 'edit/:id',
        component: CreateComponent,
      },
      {
        path: 'list',
        component: ListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SceneRoutingModule {}
