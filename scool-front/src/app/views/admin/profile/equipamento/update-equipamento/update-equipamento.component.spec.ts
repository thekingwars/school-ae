import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEquipamentoComponent } from './update-equipamento.component';

describe('UpdateEquipamentoComponent', () => {
  let component: UpdateEquipamentoComponent;
  let fixture: ComponentFixture<UpdateEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEquipamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
