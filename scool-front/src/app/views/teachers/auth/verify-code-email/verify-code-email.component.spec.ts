import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCodeEmailComponent } from './verify-code-email.component';

describe('VerifyCodeEmailComponent', () => {
  let component: VerifyCodeEmailComponent;
  let fixture: ComponentFixture<VerifyCodeEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyCodeEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyCodeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
