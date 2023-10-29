import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompListEditDeleteComponent } from './comp-list-edit-delete.component';

describe('CompListEditDeleteComponent', () => {
  let component: CompListEditDeleteComponent;
  let fixture: ComponentFixture<CompListEditDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CompListEditDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompListEditDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
