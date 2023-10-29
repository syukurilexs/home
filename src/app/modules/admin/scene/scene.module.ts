import { MatModule } from './../../../mat.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SceneRoutingModule } from './scene-routing.module';
import { SceneComponent } from './scene.component';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SceneItemComponent } from './component/scene-item/scene-item.component';
import { ListComponent } from './list/list.component';
import { CompListEditDeleteComponent } from 'src/app/components/comp-list-edit-delete/comp-list-edit-delete.component';
import { InfoComponent } from './component/info/info.component';


@NgModule({
  declarations: [
    SceneComponent,
    CreateComponent,
    SceneItemComponent,
    ListComponent,
    InfoComponent,
  ],
  imports: [
    CommonModule,
    SceneRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatModule,
    CompListEditDeleteComponent
  ]
})
export class SceneModule { }
