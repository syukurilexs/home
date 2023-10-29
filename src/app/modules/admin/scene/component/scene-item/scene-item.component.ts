import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Device } from 'src/app/utils/types/device.type';
import { SceneData } from 'src/app/utils/types/scene-dto.type';

@Component({
  selector: 'app-scene-item',
  templateUrl: './scene-item.component.html',
  styleUrls: ['./scene-item.component.scss'],
})
export class SceneItemComponent {
  @Input() input!: SceneData[];
  @Output() delete: EventEmitter<number> = new EventEmitter();

  onDelete(id: number) {
    this.delete.emit(id);
  }
}
