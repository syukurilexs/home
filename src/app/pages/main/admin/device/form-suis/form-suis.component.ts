import { Component } from '@angular/core';
import { Action } from '../../../../../types/action.type';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeviceE } from '../../../../../enums/device-type.enum';
import { map, Observable, shareReplay, Subject, takeUntil } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DeviceService } from '../../../../../services/device.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Suis } from '../../../../../types/suis.type';
import { Location, NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatList, MatListItem } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButton, MatMiniFabButton } from '@angular/material/button';

@Component({
  selector: 'app-form-suis',
  standalone: true,
  imports: [
    MatIcon,
    MatCard,
    MatCardActions,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatInput,
    MatFormFieldModule,
    MatList,
    MatListItem,
    MatDivider,
    MatMiniFabButton,
    MatButton,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './form-suis.component.html',
  styleUrl: './form-suis.component.scss',
})
export class FormSuisComponent {
  deviceForm = this.fb.group({
    name: ['', Validators.required],
    topic: ['', Validators.required],
    remark: [''],
    key: [null, Validators.required],
    value: [null, Validators.required],
  });

  hasUnitNumber = false;
  id: number = -1;
  title = 'Add switch';

  states = [
    { name: 'Lampu', type: DeviceE.Light },
    { name: 'Kipas', type: DeviceE.Fan },
    { name: 'Suis', type: DeviceE.Switch },
  ];

  actions: Action[] = [];

  destroyed = new Subject<void>();
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
      takeUntil(this.destroyed),
    );
  isHandset = false;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.isHandset$.subscribe((x) => {
      this.isHandset = x;
    });
  }

  ngOnInit(): void {
    this.getRouteParam();
  }

  getRouteParam() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id') !== null) {
        this.id = (params.get('id') as any) || -1;
        this.updateForm();
      }
    });
  }

  onSubmit(): void {
    const newSuis: Suis = {
      type: DeviceE.Switch,
      name: this.deviceForm.get('name')?.value || '',
      topic: this.deviceForm.get('topic')?.value || '',
      remark: this.deviceForm.get('remark')?.value || '',
      action: this.actions,
    };

    if (this.id > 0) {
      /** Edit */
      this.deviceService
        .updateSwitchById(this.id, newSuis)
        .subscribe((data) => {
          alert('Thanks!');
        });
    } else {
      /** Create new */
      this.deviceService.createSwitch(newSuis).subscribe({
        next: (data) => {
          alert('Thanks!');
        },
        error: (error) => {
          alert('Error');
        },
      });
    }
  }

  updateForm() {
    this.title = 'Update Switch';

    this.deviceService.getById<Suis>(this.id).subscribe((device) => {
      // Set value to common form field
      this.deviceForm.controls['name'].setValue(device.name);
      this.deviceForm.controls['topic'].setValue(device.topic);
      this.deviceForm.controls['remark'].setValue(device.remark);

      if (device.action) {
        // Assign action of switch from server to local action variable
        this.actions = device.action;

        // Just simply pick first item and assign to form field
        this.deviceForm.controls['key'].setValue(device.action[0].key as any);
        this.deviceForm.controls['value'].setValue(
          device.action[0].value as any,
        );
      }
    });
  }

  back() {
    this.location.back();
  }

  onAdd() {
    this.actions.push({
      key: this.deviceForm.get('key')?.value || '',
      value: this.deviceForm.get('value')?.value || '',
    });
  }

  onDelete(action: Action) {
    const index = this.actions.indexOf(action);
    this.actions.splice(index, 1);
  }
}
