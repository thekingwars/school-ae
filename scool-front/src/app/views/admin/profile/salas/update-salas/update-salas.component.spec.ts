import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSalasComponent } from './update-salas.component';

describe('UpdateSalasComponent', () => {
  let component: UpdateSalasComponent;
  let fixture: ComponentFixture<UpdateSalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSalasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
