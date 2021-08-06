import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalhomeComponent } from './portalhome.component';

describe('PortalhomeComponent', () => {
  let component: PortalhomeComponent;
  let fixture: ComponentFixture<PortalhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
