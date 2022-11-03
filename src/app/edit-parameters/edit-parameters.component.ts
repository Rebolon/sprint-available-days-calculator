import {Component, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
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
        <input clrInput id="nbWeeksForOneSprint" type="number" min="1" formControlName="nbWeeksForOneSprint" (blur)="updateParameters()">
        <clr-control-error *clrIfError="'required'">This is a required field</clr-control-error>
        <clr-control-error *clrIfError="'min'">Lower value is 1</clr-control-error>
      </clr-input-container>
      
      <clr-input-container>
        <label for="marginRate">Margin rate: </label>
        <input clrInput id="marginRate" type="number" step="0.1" min="0" max="1" formControlName="marginRate" (blur)="updateParameters()">
        <clr-control-error *clrIfError="'required'">This is a required field</clr-control-error>
        <clr-control-error *clrIfError="'min'">Lower value is 0</clr-control-error>
        <clr-control-error *clrIfError="'max'">Higher value is 0</clr-control-error>
      </clr-input-container>
      
      <clr-input-container>
        <label for="velocityRateForNewComer">Velocity rate for new comer: </label>
        <input clrInput id="velocityRateForNewComer" type="number" step="0.1" min="0" max="1" formControlName="velocityRateForNewComer" (blur)="updateParameters()">
        <clr-control-error *clrIfError="'required'">This is a required field</clr-control-error>
        <clr-control-error *clrIfError="'min'">Lower value is 0</clr-control-error>
        <clr-control-error *clrIfError="'max'">Higher value is 1</clr-control-error>
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

    this.formParameters.addControl('nbWeeksForOneSprint', new FormControl<number>(
      3,
      [Validators.required, Validators.min(1)]
    ));
    this.formParameters.addControl('marginRate', new FormControl<number>(
      0.1,
      [Validators.required, Validators.min(0), Validators.max(1)]
    ));
    this.formParameters.addControl('velocityRateForNewComer', new FormControl<number>(
      0.5,
      [Validators.required, Validators.min(0), Validators.max(1)]
    ));
  }

  updateParameters(): void {
    if (this.formParameters.valid) {
      const newParameters = new Parameter(
        this.formParameters.controls['nbWeeksForOneSprint'].getRawValue(),
        this.formParameters.controls['marginRate'].getRawValue(),
        this.formParameters.controls['velocityRateForNewComer'].getRawValue(),
      )

      this.parametersService.setParameters(newParameters)
    }
  }
}
