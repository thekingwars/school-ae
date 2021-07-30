import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEscolasComponent } from './create-escolas.component';

describe('CreateEscolasComponent', () => {
  let component: CreateEscolasComponent;
  let fixture: ComponentFixture<CreateEscolasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEscolasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEscolasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
