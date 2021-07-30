import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAulasComponent } from './create-aulas.component';

describe('CreateAulasComponent', () => {
  let component: CreateAulasComponent;
  let fixture: ComponentFixture<CreateAulasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAulasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
