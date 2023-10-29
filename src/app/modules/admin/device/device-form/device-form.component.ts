import { Action, Device } from 'src/app/utils/types/device.type';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { DeviceService } from 'src/app/services/device.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DeviceType } from 'src/app/utils/enums/device-type.enum';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, map, shareReplay, takeUntil } from 'rxjs';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss'],
})
export class DeviceFormComponent implements OnInit {
  deviceForm = this.fb.group({
    name: [null, Validators.required],
    type: [null, Validators.required],
    topic: ['', Validators.required],
    remark: [''],
    suis: [null],
    action: [null],
  });

  hasUnitNumber = false;
  id: number = -1;
  title = 'Add device';
  switches: Device[] = [];

  states = [
    { name: 'Lampu', type: DeviceType.Light },
    { name: 'Kipas', type: DeviceType.Fan },
    { name: 'Suis', type: DeviceType.Switch },
  ];

  destroyed = new Subject<void>();
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
      takeUntil(this.destroyed)
    );
  isHandset = false;

  actions: Action[] = [];
  selectedActions: Action[] = [];

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
    if (this.id > 0) {
      const input = {
        type: this.deviceForm.get('type')?.value,
        actions: this.selectedActions.map(x => x.value),
        name: this.deviceForm.get('name')?.value,
        topic: this.deviceForm.get('topic')?.value,
        remark: this.deviceForm.get('remark')?.value,
      };
      this.deviceService
        .updateById(this.id, input)
        .subscribe((data) => {
          alert('Thanks!');
        });
    } else {
      this.deviceService.create(this.deviceForm.value).subscribe((data) => {
        alert('Thanks!');
      });
    }
  }

  updateForm() {
    this.title = 'Update Device';
    this.deviceService.getById(this.id).subscribe((device) => {
      this.deviceForm.controls['name'].setValue(device.name as any);
      this.deviceForm.controls['type'].setValue(device.type as any);
      this.deviceForm.controls['topic'].setValue(device.topic);
      this.deviceForm.controls['remark'].setValue(device.remark);
      this.deviceForm.controls['type'].disable();

      device.selectedAction.forEach((selectedAction) => {
        this.deviceForm.controls['suis'].setValue(
          selectedAction.action.device.id as any
        );

        this.deviceForm.controls['action'].setValue(
          selectedAction.action.id as any
        );
      });

      device.selectedAction.forEach(x => {
        this.selectedActions.push({
          value: Number(x.action.id).toString(),
          key: Number(x.action.device.id).toString()
        })
      })
    });

    this.deviceService.getAllByType(DeviceType.Switch).subscribe((switches) => {
      this.switches = switches;
    });

    this.deviceService.getAllAction().subscribe((action) => {
      this.actions = action;
    });
  }

  back() {
    this.location.back();
  }

  currentSuis(id: number) {
    const found = this.switches.find((x) => x.id === id);
    if (found) {
      return found.action;
    } else {
      return [];
    }
  }

  onAdd() {
    this.selectedActions.push({
      key: this.deviceForm.get('suis')?.value || '',
      value: this.deviceForm.get('action')?.value || '',
    });
  }

  onDelete(action: Action) {
    const index = this.selectedActions.indexOf(action);
    this.selectedActions.splice(index, 1);
  }

  getSuis(id: string) {
    return this.switches.find((x) => x.id === +id);
  }

  getAction(id: string) {
    return this.actions.find((x) => x.id === +id);
  }
}
