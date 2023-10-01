import { Directive, ElementRef, HostListener } from '@angular/core';
import { Notify } from 'notiflix';
import { OnchangeService } from '../../services/pics/onchange.service';

@Directive({
  selector: '[appOnlyimgs]'
})
export class OnlyimgsDirective {

  constructor(private el: ElementRef, private _onchange: OnchangeService) { }

  @HostListener('change') onChange() {
    const inputElement: HTMLInputElement = this.el.nativeElement;

    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];

      if (file && file.name) {
        const allowedExtensions = ['jpg', 'jpeg', 'png'];

        let fileExtension = file.name.split('.').pop();
        if (fileExtension) {
          fileExtension = fileExtension.toLowerCase();
        } else {
          inputElement.value = '';
          Notify.failure('El archivo no tiene una extensión válida.');
          return;
        }

        if (!allowedExtensions.includes(fileExtension)) {
          inputElement.value = '';
          Notify.failure('Por favor, solo subir archivos (jpg, jpeg, png)', {
            position: 'right-bottom'
          });
        }
      }
    }
  }

}
