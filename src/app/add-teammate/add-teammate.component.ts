import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ClarityIcons, logoutIcon, newIcon, noteIcon } from '@cds/core/icon';
import '@cds/core/icon/register.js';
import { ClrFormsModule } from '@clr/angular';
import { IconComponent } from '../icon/icon.component';
import { TeamService } from '../manage-team/team.service';
import { TeammateFormTitlePipe } from '../manage-team/teammate-form-title.pipe';
import { MaxDaysASprintValidator } from './max-days-a-sprint.validator';
import TeammateI, { Teammate } from './teammate';
import { TeammateForm } from './teammate.form';

ClarityIcons.addIcons(logoutIcon, noteIcon, newIcon);

@Component({
    selector: 'app-add-teammate',
    imports: [
        CdsIconModule,
        RouterModule,
        ReactiveFormsModule,
        ClrFormsModule,
        TeammateFormTitlePipe,
    ],
    template: `
    <h1>{{ editedTeammate() | teammateFormTitle }}</h1>
    <form
      [formGroup]="formTeammate()"
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
          >This is a required field</clr-control-error
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
        <label for="isNewTeammate">Is new teammate ?</label>
        <clr-checkbox-wrapper>
          <input
            id="isNewTeammate"
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
            [disabled]="formTeammate().invalid"
            class="btn btn-icon btn-primary btn-block"
            type="submit"
            aria-label="save and add a new teammate"
            title="save and add a new teammate"
            name="saveAndRefresh"
          >
            <app-icon [shape]="getButtonIcon()"></app-icon>
          </button>
        </div>
        <div class="clr-col-2">
          @if (!editedTeammate()) {
            <button
              [disabled]="formTeammate().invalid"
              class="btn btn-icon btn-secondary btn-block"
              type="submit"
              aria-label="save and redirect to list teammate"
              title="save and redirect to list teammate"
              name="saveAndRedirect"
            >
              <cds-icon shape="logout"></cds-icon>
            </button>
          }
        </div>
      </div>
    </form>
  `,
    styles: []
})
export class AddTeammateComponent {
  editedTeammate: InputSignal<TeammateI | undefined> = input();
  saved: OutputEmitterRef<boolean> = output<boolean>();
  protected formTeammate = computed(() => {
    const editedTeammate = this.editedTeammate() ?? new Teammate();
    return new TeammateForm(editedTeammate, this.maxDaysInASprintValidator);
  });
  protected teamService = inject(TeamService);
  protected maxDaysInASprintValidator = inject(MaxDaysASprintValidator);
  protected router = inject(Router);
  protected getButtonText = computed(() =>
    this.editedTeammate() ? 'edit' : 'add',
  );
  protected getButtonIcon = computed(() =>
    this.editedTeammate() ? 'note' : 'new',
  );

  protected addTeammate(event: string) {
    const redirect = event === 'saveAndRedirect' ? true : false;
    if (this.formTeammate().valid) {
      try {
        const newTeammate = new Teammate(
          this.formTeammate().value.name,
          this.formTeammate().value.availableDaysInAWeek,
          this.formTeammate().value.holidaysForNextSprint,
          this.formTeammate().value.meetingDaysAWeek,
          !!this.formTeammate().value.isNewComer,
        );

        const editedTeammate = this.editedTeammate();
        if (editedTeammate) {
          this.teamService.editTeammate(newTeammate, editedTeammate);
          this.saved.emit(true);
        } else {
          this.teamService.addTeammate(newTeammate);

          if (redirect) {
            this.router.navigateByUrl('manage-team');
          } else {
            const defaultForm = new TeammateForm(
              new Teammate(),
              this.maxDaysInASprintValidator,
            );
            this.formTeammate().reset(defaultForm.value);
            this.formTeammate().markAsPristine();
            this.formTeammate().markAsUntouched();
            this.formTeammate().controls['name'].markAsUntouched();
            this.formTeammate().controls['name'].markAsPristine();
          }
        }
      } catch (e) {
        // @todo add error to form
      }
    }
  }
}
