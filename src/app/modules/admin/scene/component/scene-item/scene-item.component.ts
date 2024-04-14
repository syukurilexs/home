import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SceneData } from 'src/app/types/scene-dto-old.type';

@Component({
  selector: 'app-scene-item',
  templateUrl: './scene-item.component.html',
  styleUrls: ['./scene-item.component.scss'],
})
export class SceneItemComponent {
  @Input() input!: SceneData[];
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() inputChange = new EventEmitter<SceneData[]>();

  onDelete(id: number) {
    this.delete.emit(id);
  }

  onChange() {
    this.inputChange.emit(this.input);
  }
}
