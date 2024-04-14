import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { DeviceService } from 'src/app/services/device.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DeviceE } from 'src/app/enums/device-type.enum';
import { Action, DeviceOld } from 'src/app/types/device-old.type';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, map, shareReplay, takeUntil } from 'rxjs';
import { SuisType } from 'src/app/types/suis.type';
import { ActionType } from 'src/app/types/action.type';

@Component({
  selector: 'app-device-form-switch',
  templateUrl: './device-form-switch.component.html',
  styleUrls: ['./device-form-switch.component.scss'],
})
export class DeviceFormSwitchComponent implements OnInit {
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

  actions: ActionType[] = [];

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
    const newSuis: SuisType = {
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

    this.deviceService.getById<SuisType>(this.id).subscribe((device) => {

      // Set value to common form field
      this.deviceForm.controls['name'].setValue(device.name );
      this.deviceForm.controls['topic'].setValue(device.topic );
      this.deviceForm.controls['remark'].setValue(device.remark );


      if (device.action) {
        // Assign action of switch from server to local action variable
        this.actions = device.action;

        // Just simply pick first item and assign to form field
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

  onDelete(action: ActionType) {
    const index = this.actions.indexOf(action);
    this.actions.splice(index, 1);
  }
}
