import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TeamService } from '../manage-team/team.service';
import TeammateI, { Teammate } from './teammate';
import { Router, RouterModule } from '@angular/router';
import { TeammateForm } from './teammate.form';
import { MaxDaysASprintValidator } from './max-days-a-sprint.validator';
import { TeammateFormTitlePipe } from '../manage-team/teammate-form-title.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ClrFormsModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import '@cds/core/icon/register.js';
import { ClarityIcons, logoutIcon, noteIcon, newIcon } from '@cds/core/icon';
import { CdsIconModule } from '@cds/angular/icon';

ClarityIcons.addIcons(logoutIcon, noteIcon, newIcon);

@Component({
  selector: 'app-add-teammate',
  standalone: true,
  imports: [
    CommonModule,
    CdsIconModule,
    RouterModule,
    ReactiveFormsModule,
    ClrFormsModule,
    TeammateFormTitlePipe,
  ],
  template: `
    <h1>{{ editedTeammate | teammateFormTitle }}</h1>
    <form
      [formGroup]="formTeammate"
      (ngSubmit)="addTeammate($event.submitter.name)"
      clrForm
      clrLayout="horizontal"
    >
      <clr-input-container>
        <label for="name">Name: </label>
        <input
          id="name"
          clrInput
          type="text"
          formControlName="name"
          required
          minlength="2"
        />
        <clr-control-helper>You must fill a name</clr-control-helper>
        <clr-control-error *clrIfError="'required'"
          ><ng-container $ngIf="form"
            >This is a required field</ng-container
          ></clr-control-error
        >
        <clr-control-error *clrIfError="'minlength'; error as err"
          >Must be at least
          {{ err.requiredLength }} characters</clr-control-error
        >
      </clr-input-container>

      <clr-input-container>
        <label for="availableDaysInAWeek">Available days in a week: </label>
        <input
          id="availableDaysInAWeek"
          clrInput
          type="number"
          min="1"
          max="7"
          step="0.5"
          required
          formControlName="availableDaysInAWeek"
        />
        <clr-control-error *clrIfError="'required'"
          >This is a required field</clr-control-error
        >
        <clr-control-error *clrIfError="'min'"
          >Lower value is 1</clr-control-error
        >
        <clr-control-error *clrIfError="'max'"
          >Higher value is 7</clr-control-error
        >
      </clr-input-container>

      <clr-input-container>
        <label for="holidaysForNextSprint">Holidays for next sprint: </label>
        <input
          id="holidaysForNextSprint"
          clrInput
          type="number"
          min="0"
          step="0.5"
          required
          formControlName="holidaysForNextSprint"
        />
        <clr-control-error *clrIfError="'required'"
          >This is a required field</clr-control-error
        >
        <clr-control-error *clrIfError="'min'"
          >Lower value is 0</clr-control-error
        >
        <clr-control-error *clrIfError="'maxDaysASprint'"
          >This fied depends on the number of days in a week, and the number of
          weeks for a sprint. The value must be lower or equal to the max
          calculated value</clr-control-error
        >
      </clr-input-container>

      <clr-input-container>
        <label for="meetingDaysAWeek">Meeting days in a week (float) : </label>
        <input
          id="meetingDaysAWeek"
          clrInput
          type="number"
          step="0.1"
          min="0"
          required
          formControlName="meetingDaysAWeek"
        />
        <clr-control-error *clrIfError="'required'"
          >This is a required field</clr-control-error
        >
        <clr-control-error *clrIfError="'min'"
          >Lower value is 0</clr-control-error
        >
        <clr-control-error *clrIfError="'maxDaysAWeek'"
          >Higher value can't exceed the number of days in a
          week</clr-control-error
        >
      </clr-input-container>

      <clr-checkbox-container>
        <label>Is new teammate ? </label>
        <clr-checkbox-wrapper>
          <input
            clrCheckbox
            type="checkbox"
            formControlName="isNewComer"
            name="isNewComer"
            value="1"
          />
        </clr-checkbox-wrapper>
      </clr-checkbox-container>

      <div class="clr-row">
        <div class="clr-col-2">
          <button
            [attr.title]="getButtonText()"
            [disabled]="formTeammate.invalid"
            class="btn btn-icon btn-primary btn-block"
            name="saveAndRefresh"
            type="submit"
            aria-label="save and add a new teammate"
          >
            <cds-icon [attr.shape]="getButtonIcon()"></cds-icon>
          </button>
        </div>
        <div class="clr-col-2">
          <button
            *ngIf="!editedTeammate"
            [disabled]="formTeammate.invalid"
            class="btn btn-icon btn-secondary btn-block"
            name="saveAndRedirect"
            type="submit"
            aria-label="save and redirect to list teammate"
            title="save and redirect to list teammate"
          >
            <cds-icon shape="logout"></cds-icon>
          </button>
        </div>
      </div>
    </form>
  `,
  styles: [],
})
export class AddTeammateComponent implements OnInit, OnChanges {
  @Input() editedTeammate: TeammateI | undefined = undefined;
  protected formTeammate: TeammateForm = {} as TeammateForm;

  constructor(
    protected teamService: TeamService,
    protected maxDaysInASprintValidator: MaxDaysASprintValidator,
    protected router: Router
  ) {}

  ngOnInit(): void {
    if (this.editedTeammate) {
      this.createForm(this.editedTeammate);
    } else {
      this.createForm(new Teammate());
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editedTeammate']) {
      if (
        changes['editedTeammate'].currentValue ===
        changes['editedTeammate'].previousValue
      ) {
        return;
      }

      this.createForm(changes['editedTeammate'].currentValue);
    }
  }

  protected addTeammate(event: string) {
    const redirect = event === 'saveAndRedirect' ? true : false;
    if (this.formTeammate.valid) {
      try {
        const newTeammate = new Teammate(
          this.formTeammate.value.name,
          this.formTeammate.value.availableDaysInAWeek,
          this.formTeammate.value.holidaysForNextSprint,
          this.formTeammate.value.meetingDaysAWeek,
          !!this.formTeammate.value.isNewComer
        );

        if (this.editedTeammate) {
          this.teamService.editTeammate(newTeammate, this.editedTeammate);
        } else {
          this.teamService.addTeammate(newTeammate);
        }
        this.createForm(new Teammate());

        if (redirect) {
          this.router.navigateByUrl('manage-team');
        }
      } catch (e) {
        // @todo add error to form
      }
    }
  }

  protected getButtonText() {
    return this.editedTeammate ? 'edit' : 'add';
  }

  protected getButtonIcon() {
    return this.editedTeammate ? 'note' : 'new';
  }

  private createForm(teammate: TeammateI): void {
    this.formTeammate = new TeammateForm(
      teammate,
      this.maxDaysInASprintValidator
    );
  }
}
