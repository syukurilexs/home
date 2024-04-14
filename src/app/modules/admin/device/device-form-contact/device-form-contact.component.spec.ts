import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceFormContactComponent } from './device-form-contact.component';

describe('DeviceFormContactComponent', () => {
  let component: DeviceFormContactComponent;
  let fixture: ComponentFixture<DeviceFormContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceFormContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceFormContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
