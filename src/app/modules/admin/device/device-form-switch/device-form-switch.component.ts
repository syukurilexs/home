import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { DeviceService } from 'src/app/services/device.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DeviceType } from 'src/app/utils/enums/device-type.enum';
import { Action } from 'src/app/utils/types/device.type';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, map, shareReplay, takeUntil } from 'rxjs';

@Component({
  selector: 'app-device-form-switch',
  templateUrl: './device-form-switch.component.html',
  styleUrls: ['./device-form-switch.component.scss'],
})
export class DeviceFormSwitchComponent implements OnInit {
  deviceForm = this.fb.group({
    name: [null, Validators.required],
    type: [null, Validators.required],
    topic: ['', Validators.required],
    remark: [''],
    key: [null, Validators.required],
    value: [null, Validators.required],
  });

  hasUnitNumber = false;
  id: number = -1;
  title = 'Add device';

  states = [
    { name: 'Lampu', type: DeviceType.Light },
    { name: 'Kipas', type: DeviceType.Fan },
    { name: 'Suis', type: DeviceType.Switch },
  ];

  actions: Action[] = [];

  destroyed = new Subject<void>();
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
      takeUntil(this.destroyed)
    );
  isHandset = false;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {
    this.isHandset$.subscribe((x) => {
      this.isHandset = x;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id') !== null) {
        this.id = (params.get('id') as any) || -1;
        this.updateForm();
      }
    });
  }

  onSubmit(): void {
    const newSuis = {
      type: this.deviceForm.get('type')?.value,
      name: this.deviceForm.get('name')?.value,
      topic: this.deviceForm.get('topic')?.value,
      action: this.actions,
      remark: this.deviceForm.get('remark')?.value,
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
    this.title = 'Update Device';
    this.deviceService.getById(this.id).subscribe((device) => {
      this.deviceForm.controls['name'].setValue(device.name as any);
      this.deviceForm.controls['type'].setValue(device.type as any);
      this.deviceForm.controls['topic'].setValue(device.topic as any);
      this.deviceForm.controls['remark'].setValue(device.remark as any);

      this.deviceForm.controls['type'].disable();

      if (device.action) {
        this.actions = device.action;
        this.deviceForm.controls['key'].setValue(device.action[0].key as any);
        this.deviceForm.controls['value'].setValue(
          device.action[0].value as any
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
