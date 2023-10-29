import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceFormSwitchComponent } from './device-form-switch.component';

describe('DeviceFormSwitchComponent', () => {
  let component: DeviceFormSwitchComponent;
  let fixture: ComponentFixture<DeviceFormSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceFormSwitchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceFormSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
