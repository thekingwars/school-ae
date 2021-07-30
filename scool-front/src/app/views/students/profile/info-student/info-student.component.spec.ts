import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoStudentComponent } from './info-student.component';

describe('InfoStudentComponent', () => {
  let component: InfoStudentComponent;
  let fixture: ComponentFixture<InfoStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
