import { MatModule } from './../../mat.module';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comp-list-edit-delete',
  standalone: true,
  imports: [CommonModule,MatModule],
  templateUrl: './comp-list-edit-delete.component.html',
  styleUrls: ['./comp-list-edit-delete.component.scss']
})
export class CompListEditDeleteComponent {
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
