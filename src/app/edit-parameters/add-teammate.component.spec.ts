import { ComponentFixture, TestBed } from '@angular/core/testing';
import {EditParametersComponent} from "./add-teammate.component";

describe('AddTeammateComponent', () => {
  let component: EditParametersComponent;
  let fixture: ComponentFixture<EditParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditParametersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
