import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appUppercase]'
})
export class UppercaseDirective implements OnInit{

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
      const text = this.el.nativeElement.textContent || '';

      const upper = text.toUpperCase();

      this.renderer.setProperty(this.el.nativeElement, 'textContent', upper);
  }
}
