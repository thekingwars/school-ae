import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEstadoComponent } from './view-estado.component';

describe('ViewEstadoComponent', () => {
  let component: ViewEstadoComponent;
  let fixture: ComponentFixture<ViewEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEstadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
