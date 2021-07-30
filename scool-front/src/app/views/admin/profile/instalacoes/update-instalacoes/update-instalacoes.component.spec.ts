import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInstalacoesComponent } from './update-instalacoes.component';

describe('UpdateInstalacoesComponent', () => {
  let component: UpdateInstalacoesComponent;
  let fixture: ComponentFixture<UpdateInstalacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateInstalacoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInstalacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
