import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsSalasComponent } from './views-salas.component';

describe('ViewsSalasComponent', () => {
  let component: ViewsSalasComponent;
  let fixture: ComponentFixture<ViewsSalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewsSalasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsSalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
