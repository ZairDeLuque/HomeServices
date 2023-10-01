import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appLowercase]'
})
export class LowercaseDirective {

  constructor(private el: ElementRef) { }

  @HostListener('change') onChange() {
    const input: HTMLInputElement = this.el.nativeElement;

    if(input.value.length > 0){
      const text = input.value.toLowerCase();

      input.value = text;
    }
  }
}
