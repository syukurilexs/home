import { environment } from './../../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DeviceService } from 'src/app/services/device.service';
import { TimerService } from 'src/app/services/timer.service';
import { DeviceType } from 'src/app/utils/enums/device-type.enum';
import { Option } from 'src/app/utils/enums/option.enum';
import { State } from 'src/app/utils/enums/state.enum';
import { Device } from 'src/app/utils/types/device.type';
import { CreateTimer } from 'src/app/utils/types/timer.type';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  addressForm = this.fb.group({
    device: [null, Validators.required],
    selectedTime: [null, Validators.required],
    state: [false, Validators.required],
    option: [false, Validators.required],
  });

  devices: Device[] = [];
  deviceId: number = -1;
  timerId: number = -1;
  id: number = -1;
  submitButton = 'Submit';
  isSubmit = true;

  constructor(
    private fb: FormBuilder,
    private readonly deviceService: DeviceService,
    private readonly timerService: TimerService,
    private readonly route: ActivatedRoute
  ) {
    this.getAllDevice();
    this.getParams();
  }

  updateForm() {
    //this.addressForm.controls['device'].setValue()

    // Get device to edit
    this.deviceService.getById(this.deviceId).subscribe((x) => {
      this.addressForm.controls['device'].setValue(x.id as any);
    });

    // Get timer to edit
    this.timerService.getById(this.timerId).subscribe((x) => {
      this.addressForm.controls['selectedTime'].setValue(x.time as any);
      this.addressForm.controls['state'].setValue(
        x.option === State.On ? true : false
      );
      this.addressForm.controls['option'].setValue(
        x.option === Option.Enable ? true : false
      );
    });
  }

  /**
   * Get params (edit / update)
   */
  getParams() {
    this.route.params.subscribe((param) => {
      this.deviceId = param['deviceId'];
      this.timerId = param['timerId'];

      this.updateForm();

      this.submitButton = 'Update';
      this.isSubmit = false;
    });
  }

  getAllDevice() {
    this.deviceService.getAll().subscribe((x) => {
      this.devices = x.filter(
        (y) => y.type === DeviceType.Fan || y.type === DeviceType.Light
      );
    });
  }

  onSubmit(): void {
    const value = this.addressForm.value;

    const output: CreateTimer = {
      deviceId: value.device || 0,
      option: value.option ? Option.Enable : Option.Disable,
      state: value.state ? State.On : State.Off,
      time: value.selectedTime || '',
    };

    if (this.isSubmit) {

      this.timerService.create(output).subscribe(
        (data) => {
          alert('Submitted');
        },
        (error) => {
          alert('Fail to add');
        }
      );
    } else {
      this.timerService.updateById(output, this.timerId).subscribe(
        (data) => {
          alert('Updated');
        },
        (error) => {
          alert('Failed to update')
        }
      )
    }
  }
}
