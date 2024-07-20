import { Component, Input } from '@angular/core';
import { Scene } from '../../../../../../types/scene.type';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  @Input() data: Scene | undefined = undefined;
}
