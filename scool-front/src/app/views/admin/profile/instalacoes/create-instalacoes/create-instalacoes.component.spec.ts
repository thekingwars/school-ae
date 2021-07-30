import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstalacoesComponent } from './create-instalacoes.component';

describe('CreateInstalacoesComponent', () => {
  let component: CreateInstalacoesComponent;
  let fixture: ComponentFixture<CreateInstalacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInstalacoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInstalacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
