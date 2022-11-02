import { Pipe, PipeTransform } from '@angular/core';
import TeammateI from '../add-teammate/teammate';

@Pipe({
  name: 'teammateFormTitle'
})
export class TeammateFormTitlePipe implements PipeTransform {

  transform(editedTeammate: TeammateI|undefined, ...args: unknown[]): string {
    if (editedTeammate === undefined) {
      return 'Add new teammate'
    }

    return `Edit ${editedTeammate.name}`;
  }
}
