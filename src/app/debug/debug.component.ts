import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertService} from "../alert.service";

@Component({
  selector: 'app-debug',
  standalone: true,
  template: `
    <p>
      <button (click)="newAlert()">set alert</button>
    </p>
  `,
  styles: [
  ]
})
export class DebugComponent {

  constructor(private alert: AlertService) { }

  newAlert(): void {
    this.alert.setAlert('toto');
  }
}
