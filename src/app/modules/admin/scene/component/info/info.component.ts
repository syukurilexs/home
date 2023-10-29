import { Component, Input } from '@angular/core';
import { Scene } from 'src/app/utils/types/scene.type';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  @Input() data: Scene | undefined = undefined;

}
