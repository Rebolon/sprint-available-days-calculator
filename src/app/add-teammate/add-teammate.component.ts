import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TeamService} from "../manage-team/team.service";
import TeammateI, {Teammate} from "./teammate";
import {Router} from '@angular/router';
import {maxDaysAWeekValidator} from './max-days-a-week.validator';
import {MaxDaysASprintValidator} from './max-days-a-sprint.validator';

@Component({
  selector: 'app-add-teammate',
  //standalone: true,
  template: `
    <h1>{{editedTeammate | teammateFormTitle}}</h1>
    <form clrForm clrLayout="horizontal" [formGroup]="formTeammate" (ngSubmit)="addTeammate()">
      <clr-input-container>
        <label for="name">Name: </label>
        <input clrInput id="name" type="text" formControlName="name" required>    
        <clr-control-error *clrIfError="'required'">This is a required field</clr-control-error>
      </clr-input-container>

      <clr-input-container>
        <label for="availableDaysInAWeek">Available days in a week: </label>
        <input clrInput id="availableDaysInAWeek" type="number" min="0" max="7" required formControlName="availableDaysInAWeek">
        <clr-control-error *clrIfError="'required'">This is a required field</clr-control-error>
        <clr-control-error *clrIfError="'min'">Lower value is 0</clr-control-error>
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

      <button type="submit" [disabled]="formTeammate.invalid" class="btn btn-icon btn-primary" aria-label="add" [attr.title]="getButtonText()">
        <clr-icon [attr.shape]="getButtonIcon()"></clr-icon>
      </button>

      <button *ngIf="!editedTeammate" (click)="addTeammate(true)" [disabled]="!formTeammate.valid" type="button" class="btn btn-icon btn-secondary" aria-label="add-and-go-on-manage">
        <clr-icon shape="logout"></clr-icon>
      </button>
    </form>
  `,
  /*imports: [
    ReactiveFormsModule
  ],*/
  styles: []
})
export class AddTeammateComponent implements OnChanges {
  @Input() editedTeammate: TeammateI|undefined = undefined
  formTeammate: FormGroup

  constructor(
    protected teamService: TeamService,
    protected maxDaysInASprintValidator: MaxDaysASprintValidator,
    protected router: Router
  ) {
    this.formTeammate = new FormGroup({});
    this.formTeammate.addControl('name', new FormControl<string>(
      this.editedTeammate ? this.editedTeammate.name : '',
      [Validators.required, Validators.minLength(2)]
    ));
    this.formTeammate.addControl('availableDaysInAWeek', new FormControl<number>(
      this.editedTeammate ? this.editedTeammate.availableDaysInAWeek : 5,
      [Validators.required, Validators.min(1), Validators.max(7)]
    ));
    this.formTeammate.addControl('holidaysForNextSprint', new FormControl<number>(
      this.editedTeammate ? this.editedTeammate.holidaysForNextSprint : 0,
      {
        asyncValidators: [this.maxDaysInASprintValidator.validate.bind(this.maxDaysInASprintValidator)],
        validators: [Validators.required, Validators.min(0)]
      }
    ));
    this.formTeammate.addControl('meetingDaysAWeek', new FormControl<number>(
      this.editedTeammate ? this.editedTeammate.meetingDaysAWeek : 0,
      [Validators.required, Validators.min(0), maxDaysAWeekValidator]
    ));
    this.formTeammate.addControl('isNewComer', new FormControl<boolean>(
      this.editedTeammate ? this.editedTeammate.isNewComer : false
    ));
    /*this.formTeammate.addValidators([
      maxDaysAWeekValidator
    ])*/
    /*this.formTeammate.addAsyncValidators([
      this.maxDaysInASprintValidator.validate.bind(this.maxDaysInASprintValidator)
    ])*/
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editedTeammate']) {
      if (changes['editedTeammate'].currentValue === changes['editedTeammate'].previousValue) {
        return
      }

      this.formTeammate.controls['name'].setValue(this.editedTeammate ? this.editedTeammate.name : '');
      this.formTeammate.controls['availableDaysInAWeek'].setValue(this.editedTeammate ? this.editedTeammate.availableDaysInAWeek : 5);
      this.formTeammate.controls['holidaysForNextSprint'].setValue(this.editedTeammate ? this.editedTeammate.holidaysForNextSprint : 0);
      this.formTeammate.controls['meetingDaysAWeek'].setValue(this.editedTeammate ? this.editedTeammate.meetingDaysAWeek : 0);
      this.formTeammate.controls['isNewComer'].setValue(this.editedTeammate ? this.editedTeammate.isNewComer : false);
    }
  }

  addTeammate(redirect = false)
  {
    if (this.formTeammate.invalid) {
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
        this.formTeammate.reset();

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
