import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoLivrosComponent } from './estado-livros.component';

describe('EstadoLivrosComponent', () => {
  let component: EstadoLivrosComponent;
  let fixture: ComponentFixture<EstadoLivrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoLivrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoLivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
