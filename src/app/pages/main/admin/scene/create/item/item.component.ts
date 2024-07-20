import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SceneData } from '../../../../../../types/scene-dto-old.type';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
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
