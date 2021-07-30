import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSalasComponent } from './create-salas.component';

describe('CreateSalasComponent', () => {
  let component: CreateSalasComponent;
  let fixture: ComponentFixture<CreateSalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSalasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
