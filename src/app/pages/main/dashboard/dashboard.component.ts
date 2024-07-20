import { Component } from '@angular/core';
import { GroupComponent } from './group/group.component';
import { SceneComponent } from './scene/scene.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GroupComponent,SceneComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
