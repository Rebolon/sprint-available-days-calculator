import { TooManyHolidaysError } from './too-many-holidays-error';

export default interface TeammateI {
  readonly name: string;
  readonly availableDaysInAWeek: number;
  readonly holidaysForNextSprint: number;
  readonly meetingDaysAWeek: number;
  readonly isNewComer: boolean;
  getAvailableDaysInSprint(nbWeeksForOneSprint: number): number;
}

export class Teammate implements TeammateI {
  constructor(
    readonly name: string = '',
    readonly availableDaysInAWeek: number = 5,
    readonly holidaysForNextSprint: number = 0,
    readonly meetingDaysAWeek: number = 0,
    readonly isNewComer: boolean = false,
  ) {}

  getAvailableDaysInSprint(nbWeeksForOneSprint: number): number {
    const nbOfDaysInASprintForTeammate =
      this.availableDaysInAWeek * nbWeeksForOneSprint;
    const availableDays =
      nbOfDaysInASprintForTeammate - this.holidaysForNextSprint;

    if (availableDays < 0) {
      throw new TooManyHolidaysError(`Teammate ${this.name} has too many holidays versus number of days of a sprint
      (${this.holidaysForNextSprint} vs ${nbOfDaysInASprintForTeammate}`);
    }

    const meetingsDays = this.meetingDaysAWeek * nbWeeksForOneSprint;

    return availableDays - meetingsDays;
  }
}
