import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  title = 'Create';

  constructor(
    private readonly location: Location,
    private readonly route: ActivatedRoute
    ) {
      this.getParams();
    }

  back() {
    this.location.back();
  }


  getParams() {
    this.route.params.subscribe((param) => {
      const deviceId = param['deviceId'] || -1;
      const timerId = param['timerId'] || -1;

      if (deviceId != -1 && timerId != -1) {
        this.title = 'Edit'
      }
    });
  }
}
