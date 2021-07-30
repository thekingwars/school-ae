import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAulasComponent } from './update-aulas.component';

describe('UpdateAulasComponent', () => {
  let component: UpdateAulasComponent;
  let fixture: ComponentFixture<UpdateAulasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAulasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
