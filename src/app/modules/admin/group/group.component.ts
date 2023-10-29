import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent {
  constructor(private router: Router) {}

}
