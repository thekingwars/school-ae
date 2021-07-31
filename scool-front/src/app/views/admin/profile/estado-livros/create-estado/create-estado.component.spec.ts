import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEstadoComponent } from './create-estado.component';

describe('CreateEstadoComponent', () => {
  let component: CreateEstadoComponent;
  let fixture: ComponentFixture<CreateEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEstadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
