import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsersgestorService } from '../../services/api/usersgestor.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-details-points',
  templateUrl: './details-points.component.html',
  styleUrl: './details-points.component.css'
})
export class DetailsPointsComponent {
  protected name: string | undefined;
  protected owner: string | undefined;
  private id_shop: number | undefined;

  protected active: boolean = true;
  protected step: number = 1;

  protected pointsA: number = 1;
  protected pointsB: number = 1;
  protected pointsC: number = 1;
  protected pointsD: number = 1;
  protected pointsE: string = '';

  next(){
    setTimeout(() => {
      this.active = false;
      this.step++;
    }, 250)

    setTimeout(() => this.active = true, 500);
  }

  upload(){

    this.active = false;

    const packet = {
      _u0x: this.id_shop,
      _d0x: this.pointsA,
      _d1x: this.pointsB,
      _d2x: this.pointsC,
      _d3x: this.pointsD,
      _d4x: this.pointsE
    }

    this._service.createReview(packet).subscribe((data: any) => {
      if(data.result === true){
        Notiflix.Notify.success(data.message, {
          position: 'center-bottom'
        });
        this._dynamic.close({result: true});
      }
      else{
        Notiflix.Notify.failure('Ha ocurrido un error al enviar la reseña, por favor, intentelo de nuevo más tarde.', {
          position: 'center-bottom'
        });
        this._dynamic.close({result: false});
      }
    }, (error: any) => {
      console.log(error);
      Notiflix.Notify.failure('Ha ocurrido un error al enviar la reseña, por favor, intentelo de nuevo más tarde.', {
        position: 'center-bottom'
      });
      this._dynamic.close();
    });
  }

  constructor(public _dynamic: DynamicDialogRef, private _config: DynamicDialogConfig, private _service: UsersgestorService){
    this.name = this._config.data.name;
    this.owner = this._config.data.owner;
    this.id_shop = this._config.data.shop;
  }

}
