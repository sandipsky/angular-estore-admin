import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  standalone: true,
  imports: [CommonModule]
})
export class LoadingSpinnerComponent {

  @Input() loading: boolean = true;
  constructor() { }
}
