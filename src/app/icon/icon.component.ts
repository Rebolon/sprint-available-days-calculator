import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { SgxIconI } from './icon.model';

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<cds-icon [shape]="shape"></cds-icon> `,
})
export class IconComponent implements OnInit {
  @Input({ required: true }) shape!: SgxIconI['shape'];
  @Input() size!: SgxIconI['size'];
  @Input() direction!: SgxIconI['direction'];
  @Input() flip!: SgxIconI['flip'];
  @Input() solid: SgxIconI['solid'] = true;
  @Input() status!: SgxIconI['status'];
  @Input() inverse!: SgxIconI['inverse'];
  @Input() badge!: SgxIconI['badge'];
  @Input() title!: SgxIconI['title'];

  private renderer = inject(Renderer2);
  private el = inject(ElementRef);

  ngOnInit() {
    this.setComponentAttributes();
  }

  private setComponentAttributes() {
    const cdsIcon = this.el.nativeElement.querySelector('cds-icon');

    if (this.shape) {
      this.renderer.setAttribute(cdsIcon, 'shape', this.shape);
    }

    if (this.size) {
      this.renderer.setAttribute(cdsIcon, 'size', this.size);
    }

    if (this.direction) {
      this.renderer.setAttribute(cdsIcon, 'direction', this.direction);
    }

    if (this.flip) {
      this.renderer.setAttribute(cdsIcon, 'flip', this.flip);
    }

    if (this.solid) {
      this.renderer.setAttribute(cdsIcon, 'solid', this.solid.toString());
    }

    if (this.status) {
      this.renderer.setAttribute(cdsIcon, 'status', this.status);
    }

    if (this.inverse) {
      this.renderer.setAttribute(cdsIcon, 'inverse', this.inverse.toString());
    }

    if (this.badge) {
      this.renderer.setAttribute(cdsIcon, 'badge', this.badge.toString());
    }

    if (this.title) {
      this.renderer.setAttribute(cdsIcon, 'title', this.title.toString());
    }
  }
}
