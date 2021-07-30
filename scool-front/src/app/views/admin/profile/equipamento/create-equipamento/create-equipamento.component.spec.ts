import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEquipamentoComponent } from './create-equipamento.component';

describe('CreateEquipamentoComponent', () => {
  let component: CreateEquipamentoComponent;
  let fixture: ComponentFixture<CreateEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEquipamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
