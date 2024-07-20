import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionOld, DeviceOld } from '../../../../../types/device-old.type';
import { SceneData } from '../../../../../types/scene-dto-old.type';
import { map, Observable, shareReplay, Subject, takeUntil } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DeviceService } from '../../../../../services/device.service';
import { SceneService } from '../../../../../services/scene.service';
import { ActivatedRoute } from '@angular/router';
import { DeviceE } from '../../../../../enums/device-type.enum';
import { StateE } from '../../../../../enums/state.enum';
import { SceneDto } from '../../../../../types/scene-dto.type';
import { Location, NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatList, MatListItem } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { ItemComponent } from './item/item.component';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatButton, MatMiniFabButton } from '@angular/material/button';

type SelectedSuisAction = { deviceId: number; actionId: number };

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    MatIcon,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatFormFieldModule,
    MatFormField,
    MatInput,
    MatOption,
    MatList,
    MatListItem,
    MatDivider,
    MatSelect,
    MatButton,
    MatMiniFabButton,
    ReactiveFormsModule,
    NgClass,
    ItemComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  form = this.fb.group({
    name: [null, Validators.required],
    device: [null],
    suis: [null],
    action: [null],
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
      takeUntil(this.destroyed),
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
    private breakpointObserver: BreakpointObserver,
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
    this.deviceService
      .getAllByType<DeviceOld[]>(DeviceE.Switch)
      .subscribe((switches) => {
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
          1,
        );

        return haha;
      });

      // Populate action list
      scene.sceneAction.forEach((x) => {
        this.selectedActions.push({
          actionId: x.action.id || 0,
          deviceId: x.action.device?.id || 0,
        });
      });
    });
  }

  getDeviceList() {
    this.deviceService.getAll<DeviceOld[]>().subscribe((data) => {
      this.devices = data.filter(
        (device) =>
          device.type === DeviceE.Fan || device.type === DeviceE.Light,
      );
    });
  }

  onAdd() {
    const device: DeviceOld | null = this.form.controls['device'].value;
    if (device) {
      this.selectedDevices.push({ device, state: false });
      const idx = this.devices.findIndex(
        (item) => item.id === (device as any).id,
      );

      if (idx !== -1) this.devices.splice(idx, 1);
    }
    this.form.controls['device'].setValue(null);
  }

  onSubmit(): void {
    // Construct DTO
    const sceneDto: SceneDto = {
      name: this.form.controls['name'].value || '',
      devices: this.selectedDevices.map((x) => {
        return {
          id: x.device.id,
          state: x.state,
        };
      }),
      actions: this.selectedActions.map((x) => x.actionId),
    };

    if (this.id === undefined) {
      // Add new
      this.sceneService.create(sceneDto).subscribe((data) => {
        alert('Thanks!');
      });
    } else {
      // Edit
      this.sceneService.updateById(this.id, sceneDto).subscribe((data) => {
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
      1,
    );

    // Add back to devices
    this.devices.push(deleted[0].device);
  }

  onDeleteAction(action: SelectedSuisAction) {
    const index = this.selectedActions.indexOf(action);
    this.selectedActions.splice(index, 1);
  }
}
