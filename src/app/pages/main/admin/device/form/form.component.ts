import { Component } from '@angular/core';
import { Action } from '../../../../../types/action.type';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeviceOld } from '../../../../../types/device-old.type';
import { DeviceE } from '../../../../../enums/device-type.enum';
import { map, Observable, shareReplay, Subject, takeUntil } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DeviceService } from '../../../../../services/device.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Light } from '../../../../../types/light.type';
import { Location, NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatList, MatListItem } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import { MatInput, MatInputModule } from "@angular/material/input";
import { MatButton, MatFabButton, MatMiniFabButton } from '@angular/material/button';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatIcon,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatFormFieldModule,
    MatFormField,
    MatOption,
    MatList,
    MatListItem,
    MatDivider,
    MatSelect,
    MatInput,
    MatButton,
    MatMiniFabButton,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  deviceForm = this.fb.group({
    name: [null, Validators.required],
    topic: ['', Validators.required],
    remark: [''],
    suis: [null],
    action: [null],
  });

  hasUnitNumber = false;
  id: number = -1;
  title = 'Light';
  subTitle = 'Add';
  switches: DeviceOld[] = [];
  deviceType: DeviceE = DeviceE.Light;

  states = [
    { name: 'Lampu', type: DeviceE.Light },
    { name: 'Kipas', type: DeviceE.Fan },
    { name: 'Suis', type: DeviceE.Switch },
  ];

  destroyed = new Subject<void>();
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
      takeUntil(this.destroyed),
    );
  isHandset = false;

  actions: Action[] = [];
  selectedActions: Action[] = [];

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.isHandset$.subscribe((x) => {
      this.isHandset = x;
    });
  }

  ngOnInit(): void {
    this.getSwitches();
    this.getActions();
    this.getRouteParam();
    this.checkType();
  }

  /**
   * Checking the type to determine this is Fan or Light
   * @date 4/9/2024 - 8:27:27 AM
   */
  checkType() {
    this.deviceType = /light/.test(this.router.url)
      ? DeviceE.Light
      : DeviceE.Fan;

    // Changing title every time component change
    this.title = this.deviceType === DeviceE.Fan ? 'Fan' : 'light';
  }

  /**
   * Check if id is exist, if id is available, meaning this page for update
   * 1) Updating form with data from server
   * 2) Change subtitle to Update
   * @date 4/9/2024 - 8:26:37 AM
   */
  getRouteParam() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id') !== null) {
        this.id = (params.get('id') as any) || -1;

        // Updating form with information from server
        this.updateForm();

        // Change subtitle
        this.subTitle = 'Update ';
      }
    });
  }

  onSubmit(): void {
    if (this.id > 0) {
      const input = {
        type: this.deviceType,
        actions: this.selectedActions.map((x) => x.id),
        name: this.deviceForm.get('name')?.value,
        topic: this.deviceForm.get('topic')?.value,
        remark: this.deviceForm.get('remark')?.value,
      };

      this.deviceService.updateById(this.id, input).subscribe((data) => {
        alert('Thanks!');
      });
    } else {
      const input = {
        type: this.deviceType,
        actions: this.selectedActions.map((x) => x.value),
        name: this.deviceForm.get('name')?.value,
        topic: this.deviceForm.get('topic')?.value,
        remark: this.deviceForm.get('remark')?.value,
      };

      this.deviceService.create(input).subscribe((data) => {
        alert('Thanks!');
      });
    }
  }

  updateForm() {
    this.deviceService.getById<Light>(this.id).subscribe((device) => {
      // Set value to common form field
      this.deviceForm.controls['name'].setValue(device.name as any);
      this.deviceForm.controls['topic'].setValue(device.topic);
      this.deviceForm.controls['remark'].setValue(device.remark);

      // Added selectedAction from server to selectedAction in the component
      device.selectedAction.forEach((x) => {
        this.selectedActions.push({
          id: x.id,
          value: x.key,
          key: x.value,
          name: x.name,
        });
      });
    });
  }

  /**
   * Retrieve all switches from server.
   * Will be used for action selection
   * @date 4/9/2024 - 10:08:20 AM
   */
  getSwitches() {
    this.deviceService
      .getAllByType<DeviceOld[]>(DeviceE.Switch)
      .subscribe((switches) => {
        this.switches = switches;
      });
  }

  /**
   * Retrieve all actions from server
   * Will be used for action selection
   * @date 4/9/2024 - 10:08:51 AM
   */
  getActions() {
    this.deviceService.getAllAction<Action[]>().subscribe((action) => {
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
    // Get id of action from form field action
    const id = this.deviceForm.get('action')?.value;

    // Get action in action list base on found id
    // the push to selectedAction
    if (id) {
      const action = this.actions.find((x) => x.id === id);

      if (action) {
        this.selectedActions.push(action);
      }
    }
  }

  onDelete(action: Action) {
    const index = this.selectedActions.indexOf(action);
    this.selectedActions.splice(index, 1);
  }
}
