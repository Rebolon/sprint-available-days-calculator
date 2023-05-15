import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvailableDaysComponent } from './available-days.component';

describe('AvailableDaysComponent', () => {
  let component: AvailableDaysComponent;
  let fixture: ComponentFixture<AvailableDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvailableDaysComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvailableDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
