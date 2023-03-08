import { Component, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import ParameterI, { DefaultParameter, Parameter } from './parameters';
import { Observable } from 'rxjs';
import { ParametersService } from './parameters.service';
import { ParametersForm } from './parameters.form';
import { ClrFormsModule } from '@clr/angular';
import { AvailableDaysComponent } from '../available-days/available-days.component';

@Component({
  selector: 'app-edit-parameters',
  standalone: true,
  imports: [ClrFormsModule, ReactiveFormsModule, AvailableDaysComponent],
  template: `
    <h1>Adapt parameters</h1>
    <form [formGroup]="formParameters" clrForm clrLayout="horizontal">
      <clr-input-container>
        <label for="nbWeeksForOneSprint">Number of weeks in a sprint: </label>
        <input
          (blur)="updateParameters()"
          id="nbWeeksForOneSprint"
          clrInput
          type="number"
          min="1"
          formControlName="nbWeeksForOneSprint"
        />
        <clr-control-helper>At least 1 week for a sprint</clr-control-helper>
        <clr-control-error *clrIfError="'required'"
          >This is a required field</clr-control-error
        >
        <clr-control-error *clrIfError="'min'"
          >Lower value is 1</clr-control-error
        >
      </clr-input-container>

      <clr-input-container>
        <label for="marginRate">Margin rate: </label>
        <input
          (blur)="updateParameters()"
          id="marginRate"
          clrInput
          type="number"
          step="0.1"
          min="0"
          max="1"
          formControlName="marginRate"
        />
        <clr-control-helper
          >The margin rate to manage unexpected events</clr-control-helper
        >
        <clr-control-error *clrIfError="'required'"
          >This is a required field</clr-control-error
        >
        <clr-control-error *clrIfError="'min'"
          >Lower value is 0</clr-control-error
        >
        <clr-control-error *clrIfError="'max'"
          >Higher value is 0</clr-control-error
        >
      </clr-input-container>

      <clr-input-container>
        <label for="velocityRateForNewComer"
          >Velocity rate for new comer:
        </label>
        <input
          (blur)="updateParameters()"
          id="velocityRateForNewComer"
          clrInput
          type="number"
          step="0.1"
          min="0"
          max="1"
          formControlName="velocityRateForNewComer"
        />
        <clr-control-helper
          >A new comer is not as efficient as other teammate, here is the rate
          for this</clr-control-helper
        >
        <clr-control-error *clrIfError="'required'"
          >This is a required field</clr-control-error
        >
        <clr-control-error *clrIfError="'min'"
          >Lower value is 0</clr-control-error
        >
        <clr-control-error *clrIfError="'max'"
          >Higher value is 1</clr-control-error
        >
      </clr-input-container>
    </form>

    <app-available-days></app-available-days>
  `,
  styles: [],
})
export class EditParametersComponent {
  @Output() parameters: Observable<ParameterI>;
  protected formParameters: ParametersForm = {} as ParametersForm;

  constructor(protected parametersService: ParametersService) {
    this.parameters = parametersService.getParameters();

    this.formParameters = new ParametersForm(DefaultParameter);

    parametersService.getParameters().subscribe({
      next: (parameters: ParameterI) => {
        this.formParameters = new ParametersForm(parameters);
      },
    });
  }

  updateParameters(): void {
    if (this.formParameters.valid) {
      const newParameters = new Parameter(
        this.formParameters.controls['nbWeeksForOneSprint'].getRawValue(),
        this.formParameters.controls['marginRate'].getRawValue(),
        this.formParameters.controls['velocityRateForNewComer'].getRawValue()
      );

      this.parametersService.setParameters(newParameters);
    }
  }
}
