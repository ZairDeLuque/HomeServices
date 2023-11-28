import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ServicesGestorService } from '../../services/api/services-gestor.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-details-cancel',
  templateUrl: './details-cancel.component.html',
  styleUrl: './details-cancel.component.css'
})
export class DetailsCancelComponent {
  protected ingredient: string = '1';
  protected active: boolean = true;
  protected step: number = 1;

  constructor(public _dynamic: DynamicDialogRef, private _config: DynamicDialogConfig, private _service: ServicesGestorService){}

  next(){
    this.active = false;
    this.step++;

    setTimeout(() => {
      this.active = true;
    }, 1000);
  }

  finalStep(){
    this.active = false;

    const packet = {
      _id: this._config.data._id
    }

    this._service.cancelService(packet).subscribe((data: any) => {
      if(data.canceled === true){
        Notiflix.Notify.success('Servicio cancelado correctamente, en unos dias se le devolverá el dinero', {
          position: 'center-bottom'
        });
        this._dynamic.close({canceled: true});
      }
      else{
        Notiflix.Notify.failure(data.message, {
          position: 'center-bottom'
        });
        this._dynamic.close({canceled: false});
      }
    }, (error: any) => {
      console.log(error);
      Notiflix.Notify.failure('Ha ocurrido un error al cancelar el servicio', {
        position: 'center-bottom'
      });
      this._dynamic.close({canceled: false});
    });
  }
}
