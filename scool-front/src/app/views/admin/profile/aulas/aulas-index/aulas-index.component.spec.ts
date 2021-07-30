import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AulasIndexComponent } from './aulas-index.component';

describe('AulasIndexComponent', () => {
  let component: AulasIndexComponent;
  let fixture: ComponentFixture<AulasIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AulasIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AulasIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
