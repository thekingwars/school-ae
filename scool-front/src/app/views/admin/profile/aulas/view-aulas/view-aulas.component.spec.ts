import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAulasComponent } from './view-aulas.component';

describe('ViewAulasComponent', () => {
  let component: ViewAulasComponent;
  let fixture: ComponentFixture<ViewAulasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAulasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
