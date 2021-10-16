import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextCardComponent } from './next-card.component';

describe('NextCardComponent', () => {
  let component: NextCardComponent;
  let fixture: ComponentFixture<NextCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
