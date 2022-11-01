import {Component, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TeamService} from "../create-team/team.service";
import ParameterI, {DefaultParameter, Parameter} from './parameters';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-edit-parameters',
  //standalone: true,
  template: `
    <form clrForm clrLayout="horizontal" [formGroup]="formParameters">
      <clr-input-container>
        <label for="nbWeeksForOneSprint">Number of weeks in a sprint: </label>
        <input clrInput id="nbWeeksForOneSprint" type="number" formControlName="nbWeeksForOneSprint" (change)="updateParameters()">
      </clr-input-container>
      
      <clr-input-container>
        <label for="marginRate">Margin rate: </label>
        <input clrInput id="marginRate" type="number" step="0.1" min="0" max="1" formControlName="marginRate" (change)="updateParameters()">
      </clr-input-container>
      
      <clr-input-container>
        <label for="velocityRateForNewComer">Velocity rate for new comer: </label>
        <input clrInput id="velocityRateForNewComer" type="number" step="0.1" min="0" max="1" formControlName="velocityRateForNewComer" (change)="updateParameters()">
      </clr-input-container>
    </form>
  `,
  /*imports: [
    ReactiveFormsModule
  ],*/
  styles: []
})
export class EditParametersComponent {
  @Output() parameters: BehaviorSubject<ParameterI> = new BehaviorSubject(DefaultParameter)
  formParameters: FormGroup

  constructor(protected teamService: TeamService) {
    this.formParameters = new FormGroup({});

    this.formParameters.addControl('nbWeeksForOneSprint', new FormControl<number>(3));
    this.formParameters.addControl('marginRate', new FormControl<number>(0.1));
    this.formParameters.addControl('velocityRateForNewComer', new FormControl<number>(0.5));
  }

  updateParameters(): void {
    const newParameters = new Parameter(
      this.formParameters.controls['nbWeeksForOneSprint'].getRawValue(),
      this.formParameters.controls['marginRate'].getRawValue(),
      this.formParameters.controls['velocityRateForNewComer'].getRawValue(),
    )

    this.parameters.next(newParameters)
  }
}
