import { SceneService } from 'src/app/services/scene.service';
import { SceneData } from 'src/app/utils/types/scene-dto.type';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DeviceService } from 'src/app/services/device.service';
import { DeviceType } from 'src/app/utils/enums/device-type.enum';
import { Device } from 'src/app/utils/types/device.type';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { State } from 'src/app/utils/enums/state.enum';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  form = this.fb.group({
    name: [null, Validators.required],
    device: [null],
  });
  devices: Device[] = [];
  selectedDevices: SceneData[] = [];
  title = 'Add Scene';
  id$: Observable<number>;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private readonly deviceService: DeviceService,
    private readonly sceneService: SceneService,
    private readonly location: Location,
    private readonly route: ActivatedRoute
  ) {
    this.getDeviceList();
    this.id$ = route.params.pipe(map((p) => p['id']));
  }

  ngOnInit(): void {
    this.id$.subscribe((id) => {
      if (id) {
        this.id = id;
        this.updateEdit();
      }
    });
  }

  updateEdit() {
    this.title = 'Edit Scene';

    // Set form
    this.getScene();
  }

  getScene() {
    this.sceneService.getById(this.id).subscribe((scene) => {
      // Set name
      this.form.controls['name'].setValue(scene.name as any);

      this.selectedDevices = scene.sceneDevice.map((device) => {
        // Create new mapping
        const haha: SceneData = {
          status: device.state === State.Off ? false : true,
          device: device.device,
        };

        // Filter device by removing selected from device list
        this.devices.splice(
          this.devices.findIndex((x) => x.id === device.deviceId),
          1
        );

        return haha;
      });
    });
  }

  getDeviceList() {
    this.deviceService.getAll().subscribe((data) => {
      this.devices = data.filter(
        (device) =>
          device.type === DeviceType.Fan || device.type === DeviceType.Light
      );
    });
  }

  onAdd() {
    const device: Device | null = this.form.controls['device'].value;
    if (device) {
      this.selectedDevices.push({ device, status: false });
      const idx = this.devices.findIndex(
        (item) => item.id === (device as any).id
      );

      if (idx !== -1) this.devices.splice(idx, 1);
    }
    this.form.controls['device'].setValue(null);
  }

  onSubmit(): void {
    if (this.id === undefined) {
      // Add new
      this.sceneService
        .create({
          name: this.form.controls['name'].value || '',
          data: this.selectedDevices,
        })
        .subscribe((data) => {
          alert('Thanks!');
        });
    } else {
      // Edit
      this.sceneService
        .updateById(this.id, {
          name: this.form.controls['name'].value || '',
          data: this.selectedDevices,
        })
        .subscribe((data) => {
          alert('Thanks!');
        });
    }
  }

  back() {
    this.location.back();
  }

  onDelete(id: number) {
    // Remove from selected
    const deleted = this.selectedDevices.splice(
      this.selectedDevices.findIndex((x) => x.device.id === id),
      1
    );

    // Add back to devices
    this.devices.push(deleted[0].device);
  }
}
