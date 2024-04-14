import { SceneService } from 'src/app/services/scene.service';
import { SceneData } from 'src/app/types/scene-dto-old.type';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DeviceService } from 'src/app/services/device.service';
import { DeviceE } from 'src/app/enums/device-type.enum';
import { ActionOld, DeviceOld } from 'src/app/types/device-old.type';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, map, shareReplay, takeUntil } from 'rxjs';
import { StateE } from 'src/app/enums/state.enum';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SceneDto } from 'src/app/types/scene-dto.type';

type SelectedSuisAction = { deviceId: number, actionId: number };
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  form = this.fb.group({
    name: [null, Validators.required],
    device: [null],
    suis: [null],
    action: [null]
  });

  devices: DeviceOld[] = [];
  selectedDevices: SceneData[] = [];
  title = 'Add Scene';
  id$: Observable<number>;
  id!: number;

  destroyed = new Subject<void>();
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
      takeUntil(this.destroyed)
    );
  isHandset = false;
  switches: DeviceOld[] = [];
  actions: ActionOld[] = [];
  selectedActions: SelectedSuisAction[] = [];

  constructor(
    private fb: FormBuilder,
    private readonly deviceService: DeviceService,
    private readonly sceneService: SceneService,
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {
    this.getDeviceList();
    this.id$ = route.params.pipe(map((p) => p['id']));

    this.isHandset$.subscribe((x) => {
      this.isHandset = x;
    });
  }

  ngOnInit(): void {
    this.id$.subscribe((id) => {
      if (id) {
        this.id = id;
        this.updateEdit();
      }
    });

    this.populateSwitch();
    this.populateAction();
  }

  populateSwitch() {
    this.deviceService.getAllByType<DeviceOld[]>(DeviceE.Switch).subscribe((switches) => {
      this.switches = switches;
    });
  }

  populateAction() {
    this.deviceService.getAllAction<ActionOld[]>().subscribe((action) => {
      this.actions = action;
    });
  }

  getSuis(id: number) {
    return this.switches.find((x) => x.id === +id);
  }

  getAction(id: number) {
    return this.actions.find((x) => x.id === +id);
  }

  currentSuis(id: number) {
    const found = this.switches.find((x) => x.id === id);
    if (found) {
      return found.action;
    } else {
      return [];
    }
  }

  onAddSuis() {
    this.selectedActions.push({
      deviceId: this.form.get('suis')?.value || 0,
      actionId: this.form.get('action')?.value || 0,
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
          state: device.state === StateE.Off ? false : true,
          device: device.device,
        };

        // Filter device by removing selected from device list
        this.devices.splice(
          this.devices.findIndex((x) => x.id === device.deviceId),
          1
        );

        return haha;
      });

      // Populate action list
      scene.sceneAction.forEach(x => {
        this.selectedActions.push({ actionId: x.action.id || 0, deviceId: x.action.device?.id || 0 });
      })
    });
  }

  getDeviceList() {
    this.deviceService.getAll<DeviceOld[]>().subscribe((data) => {
      this.devices = data.filter(
        (device) =>
          device.type === DeviceE.Fan || device.type === DeviceE.Light
      );
    });
  }

  onAdd() {
    const device: DeviceOld | null = this.form.controls['device'].value;
    if (device) {
      this.selectedDevices.push({ device, state: false });
      const idx = this.devices.findIndex(
        (item) => item.id === (device as any).id
      );

      if (idx !== -1) this.devices.splice(idx, 1);
    }
    this.form.controls['device'].setValue(null);
  }

  onSubmit(): void {
    // Construct DTO
    const sceneDto: SceneDto = {
      name: this.form.controls['name'].value || '',
      devices: this.selectedDevices.map(x => {
        return {
          id: x.device.id,
          state: x.state
        }
      }),
      actions: this.selectedActions.map( x => x.actionId) 
    }

    if (this.id === undefined) {
      // Add new
      this.sceneService
        .create(sceneDto)
        .subscribe((data) => {
          alert('Thanks!');
        });
    } else {
      // Edit
      this.sceneService
        .updateById(this.id, sceneDto)
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

  onDeleteAction(action: SelectedSuisAction) {
    const index = this.selectedActions.indexOf(action);
    this.selectedActions.splice(index, 1);
  }

}
