import { DeviceService } from 'src/app/services/device.service';
import { GroupService } from './../../../../../services/group.service';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Device } from 'src/app/utils/types/device.type';
import { Location } from '@angular/common';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, startWith, map, lastValueFrom } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
})
export class GroupFormComponent {
  form = this.fb.group({
    name: [null, Validators.required],
    devices: [null],
  });

  @Input() groupId!: number;
  devices: Device[] = [];
  allDevices: Device[] = [];
  filteredDevices!: Observable<Device[]> | undefined;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private deviceService: DeviceService,
    private location: Location
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
      data.devices.findIndex((x) => x.id === device.id) === -1 ? true : false
    );
  }

  getAll() {
    this.deviceService.getAll().subscribe(async (data) => {
      this.allDevices = data;

      if (this.groupId) {
        await this.update();
      }

      this.filteredDevices = this.form.get('devices')?.valueChanges.pipe(
        startWith(null),
        map((deviceEvent: Device | null) => {
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
        })
      );
    });
  }

  back() {
    this.location.back();
  }

  remove(device: Device) {
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
