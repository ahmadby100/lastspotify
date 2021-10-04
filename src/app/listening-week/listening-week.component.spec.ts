import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeningWeekComponent } from './listening-week.component';

describe('ListeningWeekComponent', () => {
  let component: ListeningWeekComponent;
  let fixture: ComponentFixture<ListeningWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeningWeekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeningWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
