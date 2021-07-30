import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentoIndexComponent } from './equipamento-index.component';

describe('EquipamentoIndexComponent', () => {
  let component: EquipamentoIndexComponent;
  let fixture: ComponentFixture<EquipamentoIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipamentoIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipamentoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
