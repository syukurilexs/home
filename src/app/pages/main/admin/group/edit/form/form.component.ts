import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeviceOld } from '../../../../../../types/device-old.type';
import { lastValueFrom, map, Observable, startWith } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { GroupService } from '../../../../../../services/group.service';
import { DeviceService } from '../../../../../../services/device.service';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AsyncPipe, Location } from '@angular/common';
import { MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow } from '@angular/material/chips';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatButton, } from '@angular/material/button';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardActions,
    MatCardContent,
    MatInput,
    MatFormFieldModule,
    MatChipGrid,
    MatChipRow,
    MatChipInput,
    MatChipRemove,
    MatIcon,
    MatAutocompleteModule,
    MatButton,
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  form = this.fb.group({
    name: [null, Validators.required],
    devices: [null],
  });

  @Input() groupId!: number;
  devices: DeviceOld[] = [];
  allDevices: DeviceOld[] = [];
  filteredDevices!: Observable<DeviceOld[]> | undefined;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private deviceService: DeviceService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  onSubmit(): void {
    if (this.groupId !== undefined) {
      this.edit();
    } else {
      this.addNew();
    }
  }

  addNew() {
    const value = {
      name: this.form.get('name')?.value,
      devices: this.devices,
    };

    this.groupService.create(value).subscribe((data) => {
      alert('Added group');
    });
  }

  edit() {
    this.groupService
      .updateById(this.groupId, {
        name: this.form.get('name')?.value,
        devices: this.devices,
      })
      .subscribe((data) => {
        alert('Updated');
      });
  }

  async update() {
    const data = await lastValueFrom(this.groupService.getById(this.groupId));

    this.form.controls['name'].setValue(data.name as any);

    // Add to chip
    this.devices = data.devices;

    // Remove from all because some already pre selected to chip
    this.allDevices = this.allDevices.filter((device) =>
      data.devices.findIndex((x) => x.id === device.id) === -1 ? true : false,
    );
  }

  getAll() {
    this.deviceService.getAll<DeviceOld[]>().subscribe(async (data) => {
      this.allDevices = data;

      if (this.groupId) {
        await this.update();
      }

      this.filteredDevices = this.form.get('devices')?.valueChanges.pipe(
        startWith(null),
        map((deviceEvent: DeviceOld | null) => {
          if (deviceEvent === null) {
            return this.allDevices;
          } else {
            this.allDevices = this.allDevices.filter((device) => {
              if (device.id === deviceEvent.id) {
                this.devices.push(deviceEvent);
                return false;
              } else {
                return true;
              }
            });

            return this.allDevices;
          }
        }),
      );
    });
  }

  back() {
    this.location.back();
  }

  remove(device: DeviceOld) {
    this.devices = this.devices.filter((x) => {
      if (x.id === device.id) {
        this.allDevices.push(device);
        return false;
      } else {
        return true;
      }
    });
  }

  add(event: MatChipInputEvent) {}

  selected(event: MatAutocompleteSelectedEvent): void {
    //this.fruits.push(event.option.viewValue);
    //this.fruitInput.nativeElement.value = '';
    //this.fruitCtrl.setValue(null);
  }
}
