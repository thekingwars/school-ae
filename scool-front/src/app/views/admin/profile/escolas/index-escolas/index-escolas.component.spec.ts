import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexEscolasComponent } from './index-escolas.component';

describe('IndexEscolasComponent', () => {
  let component: IndexEscolasComponent;
  let fixture: ComponentFixture<IndexEscolasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexEscolasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexEscolasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
