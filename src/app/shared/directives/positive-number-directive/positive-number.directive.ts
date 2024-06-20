import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[positiveNumber]',
  standalone: true
})
export class PositiveNumberDirective {

  constructor() { }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: any) {
    const reg = /^\d*\.?\d{0,2}$/g;
    let input = event.target['value'] + String.fromCharCode(event.charCode);
    if (!reg.test(input)) {
      event.preventDefault();
    }
  }

}
