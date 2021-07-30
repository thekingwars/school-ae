import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInstalacoesComponent } from './view-instalacoes.component';

describe('ViewInstalacoesComponent', () => {
  let component: ViewInstalacoesComponent;
  let fixture: ComponentFixture<ViewInstalacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInstalacoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInstalacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
