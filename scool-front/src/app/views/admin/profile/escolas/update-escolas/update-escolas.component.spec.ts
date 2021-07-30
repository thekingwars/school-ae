import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEscolasComponent } from './update-escolas.component';

describe('UpdateEscolasComponent', () => {
  let component: UpdateEscolasComponent;
  let fixture: ComponentFixture<UpdateEscolasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEscolasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEscolasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
