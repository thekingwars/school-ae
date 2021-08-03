import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCodePhoneComponent } from './verify-code-phone.component';

describe('VerifyCodePhoneComponent', () => {
  let component: VerifyCodePhoneComponent;
  let fixture: ComponentFixture<VerifyCodePhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyCodePhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyCodePhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
