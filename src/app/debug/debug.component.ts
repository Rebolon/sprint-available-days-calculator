import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertService} from "../alert.service";

@Component({
  selector: 'app-debug',
  standalone: true,
  imports: [CommonModule],
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
