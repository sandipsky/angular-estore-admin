import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxNepaliDatepickerComponent } from './ngx-nepali-datepicker.component';

describe('NgxNepaliDatepickerComponent', () => {
  let component: NgxNepaliDatepickerComponent;
  let fixture: ComponentFixture<NgxNepaliDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxNepaliDatepickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxNepaliDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
