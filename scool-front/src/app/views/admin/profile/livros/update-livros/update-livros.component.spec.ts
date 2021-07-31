import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLivrosComponent } from './update-livros.component';

describe('UpdateLivrosComponent', () => {
  let component: UpdateLivrosComponent;
  let fixture: ComponentFixture<UpdateLivrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLivrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
