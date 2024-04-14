import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common'
import { DeviceE } from 'src/app/enums/device-type.enum';
import { DeviceService } from 'src/app/services/device.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { ContactType } from 'src/app/types/contact.type';

@Component({
  selector: 'app-device-form-contact',
  templateUrl: './device-form-contact.component.html',
  styleUrl: './device-form-contact.component.scss'
})
export class DeviceFormContactComponent implements OnInit {

  form = this.fb.group({
    name: ['', Validators.required],
    topic: ['', Validators.required],
    key: ['', Validators.required],
    remark: ['']
  });

  title = 'Add Contact';
  id: number = -1;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private deviceService: DeviceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getRouteParam();
  }


  /**
   * Getting id number from route. This only applicable for edit only
   * eg route:- admin/add/device/:id
   * @date 4/8/2024 - 11:18:34 AM
   * 
   */
  getRouteParam() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        if (params.get('id') !== null) {
          this.id = Number(params.get('id'));
          this.poplulateForm();
        }
      }
    );
  }


  /**
   * To update form value with contact information
   * get cantact information from database
   * @date 4/8/2024 - 11:36:13 AM
   */
  poplulateForm() {
    if (this.id !== -1) {
      // get contact data by id 
      this.deviceService.getById<ContactType>(this.id).subscribe((contact) => {

        // Change title accordingly
        this.title = 'Update Contact';

        // Update form
        this.form.controls['name'].setValue(contact.name);
        this.form.controls['topic'].setValue(contact.topic);
        this.form.controls['remark'].setValue(contact.remark);
        this.form.controls['key'].setValue(contact.key);
      });
    }
  }

  back() {
    this.location.back();
  }


  /**
   * This method used to create and edit contact on server
   * @date 4/8/2024 - 11:44:02 AM
   */
  onSubmit() {
    // Get value from the form
    const value = {
      name: this.form.get('name')?.value,
      type: DeviceE.Contact,
      topic: this.form.get('topic')?.value,
      key: this.form.get('key')?.value,
      remark: this.form.get('remark')?.value
    }

    if (this.id !== -1) {
      // If current page is for edit then need to update the data

      this.deviceService.updateById(this.id, value).subscribe(obs => {
        alert('Thanks! updated')
      })


    } else {
      // Else create the data

      this.deviceService.createContact(value).subscribe(obs => {
        alert('Thanks!');
      })

    }

  }
}
