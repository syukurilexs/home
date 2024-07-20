import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
})
export class GroupComponent {}
