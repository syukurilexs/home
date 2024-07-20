import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-list-update',
  standalone: true,
  imports: [MatIcon,MatMiniFabButton],
  templateUrl: './list-update.component.html',
  styleUrl: './list-update.component.scss'
})
export class ListUpdateComponent {
 @Input() list: Partial<{name: string, id: number}>[] = [];
  @Output() onDelete = new EventEmitter<number>();
  @Output() onEdit= new EventEmitter<number>();
  @Output() onInfo = new EventEmitter<number>();

  onClickedDelete(id: number | undefined) {
    this.onDelete.emit(id);
  }

  onClickedEdit(id: number | undefined) {
    this.onEdit.emit(id);
  }

  onClickedInfo(id: number | undefined) {
    this.onInfo.emit(id);
  }
}
