import { environment } from './../../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DeviceService } from 'src/app/services/device.service';
import { TimerService } from 'src/app/services/timer.service';
import { DeviceE } from 'src/app/enums/device-type.enum';
import { OptionE } from 'src/app/enums/option.enum';
import { StateE } from 'src/app/enums/state.enum';
import { DeviceOld } from 'src/app/types/device-old.type';
import { CreateTimer } from 'src/app/types/timer.type';
import { Device } from 'src/app/types/device.type';

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

  devices: DeviceOld[] = [];
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

    // Get device to edit
    this.deviceService.getById<DeviceOld>(this.deviceId).subscribe((x) => {
      this.addressForm.controls['device'].setValue(x.id as any);
    });

    // Get timer to edit
    this.timerService.getById(this.timerId).subscribe((x) => {
      this.addressForm.controls['selectedTime'].setValue(x.time as any);
      this.addressForm.controls['state'].setValue(
        x.option === StateE.On ? true : false
      );
      this.addressForm.controls['option'].setValue(
        x.option === OptionE.Enable ? true : false
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

      if (this.deviceId != undefined && this.timerId != undefined) {

        this.updateForm();

        this.submitButton = 'Update';
        this.isSubmit = false;
      }
    });
  }

  getAllDevice() {
    this.deviceService.getAll<DeviceOld[]>().subscribe((x) => {
      this.devices = x.filter(
        (y) => y.type === DeviceE.Fan || y.type === DeviceE.Light
      );
    });
  }

  onSubmit(): void {
    const value = this.addressForm.value;

    const output: CreateTimer = {
      deviceId: value.device || 0,
      option: value.option ? OptionE.Enable : OptionE.Disable,
      state: value.state ? StateE.On : StateE.Off,
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
