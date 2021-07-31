import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLivrosComponent } from './view-livros.component';

describe('ViewLivrosComponent', () => {
  let component: ViewLivrosComponent;
  let fixture: ComponentFixture<ViewLivrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLivrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
