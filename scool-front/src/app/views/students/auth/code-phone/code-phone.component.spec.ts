import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodePhoneComponent } from './code-phone.component';

describe('CodePhoneComponent', () => {
  let component: CodePhoneComponent;
  let fixture: ComponentFixture<CodePhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodePhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodePhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
