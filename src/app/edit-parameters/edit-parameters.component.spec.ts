import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditParametersComponent } from './edit-parameters.component';

describe('EditParametersComponent', () => {
  let component: EditParametersComponent;
  let fixture: ComponentFixture<EditParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditParametersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
