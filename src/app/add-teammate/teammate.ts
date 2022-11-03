import {TooManyHolidaysError} from './too-many-holidays-error';

export default interface TeammateI {
  readonly name: string
  readonly availableDaysInAWeek: number
  readonly holidaysForNextSprint: number
  readonly meetingDaysAWeek: number
  readonly isNewComer: boolean

  getAvailableDaysInSprint(nbWeeksForOneSprint: number): number
}

export class Teammate implements TeammateI {
  readonly name: string;
  readonly availableDaysInAWeek: number;
  readonly holidaysForNextSprint: number;
  readonly meetingDaysAWeek: number;
  readonly isNewComer: boolean;

  constructor (
    name: string,
    availableDaysInWeek = 5,
    holidaysForNextSprint = 0,
    meetingDaysAWeek = 0,
    isNewComer = false
  ) {
    this.name = name;
    this.availableDaysInAWeek = availableDaysInWeek;
    this.holidaysForNextSprint = holidaysForNextSprint;
    this.meetingDaysAWeek = meetingDaysAWeek;
    this.isNewComer = isNewComer
  }

  getAvailableDaysInSprint(nbWeeksForOneSprint: number): number {
    let nbOfDaysInASprintForTeammate = this.availableDaysInAWeek * nbWeeksForOneSprint
    let availableDays = nbOfDaysInASprintForTeammate - this.holidaysForNextSprint

    if (availableDays < 0) {
      throw new TooManyHolidaysError(`Teammate ${this.name} has too many holidays versus number of days of a sprint 
      (${this.holidaysForNextSprint} vs ${nbOfDaysInASprintForTeammate}`)
    }

    let meetingsDays = this.meetingDaysAWeek * nbWeeksForOneSprint

    return availableDays-meetingsDays
  }
}
