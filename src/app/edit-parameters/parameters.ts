import { InvalidArgumentError } from './invalid-argument-error';

export default interface ParameterI {
  readonly nbWeeksForOneSprint: number;
  readonly marginRate: number;
  readonly velocityRateForNewComer: number;
}

export class Parameter implements ParameterI {
  readonly nbWeeksForOneSprint: number;
  readonly marginRate: number;
  readonly velocityRateForNewComer: number;

  constructor(
    nbWeeksForOneSprint: number = 3,
    marginRate = 0.1,
    velocityRateForNewComer = 0.5
  ) {
    this.nbWeeksForOneSprint = nbWeeksForOneSprint;

    if (marginRate < 0 || marginRate > 1) {
      throw new InvalidArgumentError(
        `MarginRate must be between 0 and 1. ${marginRate} provided`
      );
    }
    this.marginRate = marginRate;

    if (velocityRateForNewComer < 0 || velocityRateForNewComer > 1) {
      throw new InvalidArgumentError(
        `velocityRateForNewComer must be between 0 and 1. ${velocityRateForNewComer} provided`
      );
    }
    this.velocityRateForNewComer = velocityRateForNewComer;
  }
}

export const DefaultParameter = new Parameter();
