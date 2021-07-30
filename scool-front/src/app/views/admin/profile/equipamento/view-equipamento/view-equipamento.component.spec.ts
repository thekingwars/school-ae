import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEquipamentoComponent } from './view-equipamento.component';

describe('ViewEquipamentoComponent', () => {
  let component: ViewEquipamentoComponent;
  let fixture: ComponentFixture<ViewEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEquipamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
