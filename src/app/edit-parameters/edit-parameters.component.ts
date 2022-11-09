import {Component, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import ParameterI, {DefaultParameter, Parameter} from './parameters';
import {Observable} from 'rxjs';
import {ParametersService} from './parameters.service';
import {EditParametersForm} from './edit-parameters.form';

@Component({
  selector: 'app-edit-parameters',
  //standalone: true,
  template: `
    <h1>Adapt parameters</h1>
    <form clrForm clrLayout="horizontal" [formGroup]="formParameters">
      <clr-input-container>
        <label for="nbWeeksForOneSprint">Number of weeks in a sprint: </label>
        <input clrInput id="nbWeeksForOneSprint" type="number" min="1" formControlName="nbWeeksForOneSprint" (blur)="updateParameters()">
        <clr-control-helper>At least 1 week for a sprint</clr-control-helper>
        <clr-control-error *clrIfError="'required'">This is a required field</clr-control-error>
        <clr-control-error *clrIfError="'min'">Lower value is 1</clr-control-error>
      </clr-input-container>

      <clr-input-container>
        <label for="marginRate">Margin rate: </label>
        <input clrInput id="marginRate" type="number" step="0.1" min="0" max="1" formControlName="marginRate" (blur)="updateParameters()">
        <clr-control-helper>The margin rate to manage unexpected events</clr-control-helper>
        <clr-control-error *clrIfError="'required'">This is a required field</clr-control-error>
        <clr-control-error *clrIfError="'min'">Lower value is 0</clr-control-error>
        <clr-control-error *clrIfError="'max'">Higher value is 0</clr-control-error>
      </clr-input-container>

      <clr-input-container>
        <label for="velocityRateForNewComer">Velocity rate for new comer: </label>
        <input clrInput id="velocityRateForNewComer" type="number" step="0.1" min="0" max="1" formControlName="velocityRateForNewComer" (blur)="updateParameters()">
        <clr-control-helper>A new comer is not as efficient as other teammate, here is the rate for this</clr-control-helper>
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
  formParameters: FormGroup = {} as FormGroup

  constructor(protected parametersService: ParametersService, protected editParametersFormService: EditParametersForm) {
    this.parameters = parametersService.getParameters()

    this.formParameters = this.editParametersFormService.createForm(DefaultParameter)

    parametersService.getParameters().subscribe({
      next: (parameters: ParameterI) => {
        this.formParameters = this.editParametersFormService.createForm(parameters)
      }
    })

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
