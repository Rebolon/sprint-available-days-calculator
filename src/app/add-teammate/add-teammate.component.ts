import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {TeamService} from "../manage-team/team.service";
import TeammateI, {Teammate} from "./teammate";
import {Router} from '@angular/router';
import {AddTeammateForm} from './add-teammate.form';

@Component({
  selector: 'app-add-teammate',
  //standalone: true,
  template: `
    <h1>{{editedTeammate | teammateFormTitle}}</h1>
    <form clrForm clrLayout="horizontal" [formGroup]="formTeammate">
      <clr-input-container>
        <label for="name">Name: </label>
        <input clrInput id="name" type="text" formControlName="name" required minlength="2" />
        <clr-control-helper>You must fill a name</clr-control-helper>
        <clr-control-error *clrIfError="'required'">This is a required field</clr-control-error>
        <clr-control-error *clrIfError="'minlength'; error as err">Must be at least {{ err.requiredLength }} characters</clr-control-error>
      </clr-input-container>

      <clr-input-container>
        <label for="availableDaysInAWeek">Available days in a week: </label>
        <input clrInput id="availableDaysInAWeek" type="number" min="1" max="7" required formControlName="availableDaysInAWeek">
        <clr-control-error *clrIfError="'required'">This is a required field</clr-control-error>
        <clr-control-error *clrIfError="'min'">Lower value is 1</clr-control-error>
        <clr-control-error *clrIfError="'max'">Higher value is 7</clr-control-error>
      </clr-input-container>

      <clr-input-container>
        <label for="holidaysForNextSprint">Holidays for next sprint: </label>
        <input clrInput id="holidaysForNextSprint" type="number" min="0" required formControlName="holidaysForNextSprint">
        <clr-control-error *clrIfError="'required'">This is a required field</clr-control-error>
        <clr-control-error *clrIfError="'min'">Lower value is 0</clr-control-error>
        <clr-control-error *clrIfError="'maxDaysASprint'">This fied depends on the number of days in a week,
          and the number of weeks for a sprint. The value must be lower or equal to the max calculated value</clr-control-error>
      </clr-input-container>

      <clr-input-container>
        <label for="meetingDaysAWeek">Meeting days in a week (float) : </label>
        <input clrInput id="meetingDaysAWeek" type="number" step="0.1" min="0" required formControlName="meetingDaysAWeek">
        <clr-control-error *clrIfError="'required'">This is a required field</clr-control-error>
        <clr-control-error *clrIfError="'min'">Lower value is 0</clr-control-error>
        <clr-control-error *clrIfError="'maxDaysAWeek'">Higher value can't exceed the number of days in a week</clr-control-error>
      </clr-input-container>

      <clr-checkbox-container>
        <label>Is new teammate ? </label>
        <clr-checkbox-wrapper>
            <input clrCheckbox type="checkbox" formControlName="isNewComer" name="isNewComer" value="1">
        </clr-checkbox-wrapper>
      </clr-checkbox-container>

      <button (click)="addTeammate()" type="submit" class="btn btn-icon btn-primary" aria-label="add" [attr.title]="getButtonText()">
        <clr-icon [attr.shape]="getButtonIcon()"></clr-icon>
      </button>

      <button *ngIf="!editedTeammate" (click)="addTeammate(true)" type="button" class="btn btn-icon btn-secondary" aria-label="add-and-go-on-manage">
        <clr-icon shape="logout"></clr-icon>
      </button>
    </form>
<!--
    Debug Form status: {{formTeammate.status}}<br />
    Debug Form Field "name":
    <ul>
      <li>status: {{formTeammate.controls['name'].status}}</li>
      <li>pending: {{formTeammate.controls['name'].pending}}</li>
      <li>pristine: {{formTeammate.controls['name'].pristine}}</li>
      <li>touched: {{formTeammate.controls['name'].touched}}</li>
      <li>dirty: {{formTeammate.controls['name'].dirty}}</li>
      <li>errors: {{formTeammate.controls['name'].errors | json}}</li>
    </ul>
    -->
  `,
  /*imports: [
    ReactiveFormsModule
  ],*/
  styles: []
})
export class AddTeammateComponent implements OnInit {
  @Input() editedTeammate: TeammateI|undefined = undefined
  formTeammate: FormGroup = {} as FormGroup

  constructor(
    protected teamService: TeamService,
    protected addTeammateFormService: AddTeammateForm,
    protected router: Router
  ) {}

  ngOnInit():void {
    if (this.editedTeammate) {
      this.formTeammate = this.addTeammateFormService.createEditForm(this.editedTeammate);
    } else {
      this.formTeammate = this.addTeammateFormService.createAddForm();
    }
  }

  addTeammate(redirect = false)
  {
    if (!this.formTeammate.valid) {
      this.formTeammate.markAsTouched()
    } else {
      try {
        const newTeammate = new Teammate(
          this.formTeammate.value.name ?? '',
          this.formTeammate.value.availableDaysInAWeek ?? 5,
          this.formTeammate.value.holidaysForNextSprint ?? 0,
          this.formTeammate.value.meetingDaysAWeek ?? 0,
          !!this.formTeammate.value.isNewComer
        )

        if (this.editedTeammate) {
          this.teamService.editTeammate(newTeammate, this.editedTeammate)
        } else {
          this.teamService.addTeammate(newTeammate)
        }
        this.addTeammateFormService.resetForm(this.formTeammate)

        if (redirect) {
          this.router.navigateByUrl('manage-team');
        }
      } catch (e) {
        // @todo add error to form
      }
    }
  }

  getButtonText()
  {
    return this.editedTeammate ? 'edit' : 'add';
  }

  getButtonIcon()
  {
    return this.editedTeammate ? 'note' : 'new';
  }
}
