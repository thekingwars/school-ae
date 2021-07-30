import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEscolaComponent } from './view-escola.component';

describe('ViewEscolaComponent', () => {
  let component: ViewEscolaComponent;
  let fixture: ComponentFixture<ViewEscolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEscolaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEscolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
