import { Injectable, Signal, signal } from '@angular/core';
import TeammateI from './add-teammate/teammate';
import ParameterI, { DefaultParameter } from './edit-parameters/parameters';

export interface StorageI {
  hasSavedData: Signal<boolean>;
  save(data: { team: TeammateI[]; parameters: ParameterI }): void;
  clear(): void;
}

export interface DataStorageI {
  team: TeammateI[];
  parameters: ParameterI;
}

@Injectable({
  providedIn: 'root',
})
export class StorageService implements StorageI {
  private storage = localStorage;
  public readonly hasSavedData = signal(false);

  constructor() {
    this.storage.getItem('team') && this.storage.getItem('parameters')
      ? this.hasSavedData.set(true)
      : this.hasSavedData.set(false);
  }

  public save(data: DataStorageI): void {
    if (data.team) {
      this.storage.setItem('team', JSON.stringify(data.team));
    }
    this.storage.setItem(
      'parameters',
      data.parameters
        ? JSON.stringify(data.parameters)
        : JSON.stringify(DefaultParameter),
    );
    this.hasSavedData.set(true);
  }

  public clear(): void {
    this.storage.removeItem('team');
    this.storage.removeItem('parameters');
    this.hasSavedData.set(false);
  }

  public restore(): DataStorageI {
    const team: TeammateI[] = this.storage.getItem('team')
      ? JSON.parse(this.storage.getItem('team') as string)
      : [];
    const parameters = this.storage.getItem('parameters')
      ? JSON.parse(localStorage.getItem('parameters') as string)
      : DefaultParameter;

    this.hasSavedData.set(false);

    return {
      team,
      parameters,
    };
  }
}
