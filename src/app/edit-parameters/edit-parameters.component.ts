import {Component, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import ParameterI, {Parameter} from './parameters';
import {Observable} from 'rxjs';
import {ParametersService} from './parameters.service';

@Component({
  selector: 'app-edit-parameters',
  //standalone: true,
  template: `
    <h1>Adapt parameters</h1>
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
    
    <app-available-days></app-available-days>
  `,
  /*imports: [
    ReactiveFormsModule
  ],*/
  styles: []
})
export class EditParametersComponent {
  @Output() parameters: Observable<ParameterI>
  formParameters: FormGroup

  constructor(protected parametersService: ParametersService) {
    this.parameters = parametersService.getParameters()
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

    this.parametersService.setParameters(newParameters)
  }
}
