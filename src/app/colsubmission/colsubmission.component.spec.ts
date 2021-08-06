import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColsubmissionComponent } from './colsubmission.component';

describe('ColsubmissionComponent', () => {
  let component: ColsubmissionComponent;
  let fixture: ComponentFixture<ColsubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColsubmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColsubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
