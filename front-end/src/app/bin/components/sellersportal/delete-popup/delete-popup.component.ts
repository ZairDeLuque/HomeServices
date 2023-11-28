import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ServicesGestorService } from 'src/app/bin/services/api/services-gestor.service';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrl: './delete-popup.component.css'
})
export class DeletePopupComponent implements OnInit{
  
  protected name: string = '';
  protected status: string = '';
  private uuid: string = '';

  constructor(public _dynamic: DynamicDialogRef, private _config: DynamicDialogConfig, private _service: ServicesGestorService){}

  ngOnInit(): void {
    this._config.data.name ? this.name = this._config.data.name : this.name = '';
    this._config.data.uuid ? this.uuid = this._config.data.uuid : this.uuid = '';
    this._config.data.status ? this.status = this._config.data.status : this.status = '';
  }

  deleteService(){   
    Notiflix.Loading.dots('Despidiéndose del servicio...',{
      clickToClose: false,
      svgColor: '#a95eff',
      className: 'font-b',
      backgroundColor: '#fff',
      messageColor: '#000'
    })

    const packet = {
      _uuid: this.uuid
    }

    this._service.deleteServicesSP(packet).subscribe((data: any) => {
      if(data.deleted === true){
        Notiflix.Loading.remove();
        Notiflix.Notify.success('Servicio eliminado correctamente', {
          position: 'center-bottom'
        });
        this._dynamic.close({deleted: true});
      }
      else{
        Notiflix.Loading.remove();
        Notiflix.Notify.failure(data.message, {
          position: 'center-bottom'
        });
      }
    }, (error: any) => {
      console.log(error);
      Notiflix.Loading.remove();
      Notiflix.Notify.failure('Ha ocurrido un error al eliminar el servicio', {
        position: 'center-bottom'
      });
    })
  }
}
