import { MatModule } from './../../../mat.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { GroupComponent } from './components/group/group.component';
import { GroupItemComponent } from './components/group-item/group-item.component';
import { SceneComponent } from './components/scene/scene.component';

@NgModule({
  declarations: [
    DashboardComponent,
    GroupComponent,
    GroupItemComponent,
    SceneComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, MatModule],
})
export class DashboardModule {}
