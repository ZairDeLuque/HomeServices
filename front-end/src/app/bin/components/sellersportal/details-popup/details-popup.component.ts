import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ServicesGestorService } from 'src/app/bin/services/api/services-gestor.service';
import { UsersgestorService } from 'src/app/bin/services/api/usersgestor.service';

@Component({
  selector: 'app-details-popup',
  templateUrl: './details-popup.component.html',
  styleUrl: './details-popup.component.css'
})
export class DetailsPopupComponent implements OnInit{

  protected servicePacket: any;
  protected subs: any;
  protected invoice: any;
  protected active: boolean = true;
  protected errors: boolean = false;

  protected laststep: boolean = true;

  protected events: any[] = [];

  constructor(public _dynamic: DynamicDialogRef, private _config: DynamicDialogConfig, private _service: ServicesGestorService, private _users: UsersgestorService){    
  }

  padZero(number: number): string {
    return number.toString().padStart(2, '0');
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const day = this.padZero(date.getDate());
    const month = this.padZero(date.getMonth() + 1); 
    const year = this.padZero(date.getFullYear() % 100);
    const formattedDateTime = `${day}/${month}/${year} | ${hours}:${minutes}hrs`;
    return formattedDateTime;
  }

  getInvoiceInfo(){
    const json = {
      _uuid: this.servicePacket.article0x0,
      _payer: this.servicePacket.shopper0x2
    }

    this._service.invoiceData(json).subscribe((data: any) => {
      if(data.get === true){
        this.invoice = data;
      }
    }, (error: any) => {
      console.log(error);
      this.errors = true;
    });
  }

  formatStringPayment(string: string){
    switch (string){
      case 'MPAGO':
        return 'Mercado Pago';
      case 'PAYPAL':
        return 'PayPal';
      case 'STRIPE':
        return 'Stripe';
      default: 
        return 'Desconocido';
    }
  }

  bugDetected(){
    Notiflix.Notify.info('Tu orden se ha notificado a Aurora Studios, en breve seras notificado de novedades.', {
      position: 'center-bottom'
    });
    this._dynamic.close();
  }

  next(){
  
    const packet = {
      _uuid: this.servicePacket.id_shop0x4,
      _status: this.servicePacket.completed0x12 + 1
    }

    this._service.nextStep(packet).subscribe((data: any) => {
      if(data.updated === true){
        Notiflix.Loading.remove();
        window.location.reload();
      }
    }, (error: any) => {
      console.error(error);
      Notiflix.Loading.remove();
      Notiflix.Notify.failure('No se pudo actualizar el estado del servicio. Cierre e inicie de nuevo el panel de detalles.', {
        position: 'center-bottom'
      });
    });
  }

  cancel(){
    const packet = {
      _id: this.servicePacket.id_shop0x4
    }

    this._service.cancelSP(packet).subscribe((data: any) => {
      if(data.canceled === true){
        window.location.reload()
      }
      else{
        Notiflix.Notify.failure(data.message, {
          position: 'center-bottom'
        });
      }
    }, (error: any) => {
      console.log(error);
      Notiflix.Notify.failure('Ha ocurrido un error al cancelar el servicio', {
        position: 'center-bottom'
      });
      this._dynamic.close();
    });
  }

  getSub(){
    const json = {
      _u0x: this.servicePacket.shopper0x2
    }

    this._users.getSubCredentials(json).subscribe((data: any) => {
      if(data.exists === true){
        this.subs = data.result;
        this.active = false;
      }
      else{
        this.errors = true;
      }
    }, (error: any) => {
      console.log(error);
      this.errors = true;
    });
  }

  formatStatus(status: number): void{
    switch (status){
      case 0:
        this.events = [
          { status: 'Esperando', date: '15/10/2020 10:30', icon: 'bi bi-cart', color: '#cfa6ff' },
        ];
        break;
      case 1:
        this.events = [
          { status: 'Esperando', date: '15/10/2020 10:30', icon: 'bi bi-cart', color: '#cfa6ff' },
          { status: 'Preparando', date: '15/10/2020 14:00', icon: 'bi bi-gear', color: '#c08aff' },
        ];
        break;
      case 2:
        this.events = [
          { status: 'Esperando', date: '15/10/2020 10:30', icon: 'bi bi-cart', color: '#cfa6ff' },
          { status: 'Preparando', date: '15/10/2020 14:00', icon: 'bi bi-gear', color: '#c08aff' },
          { status: 'En camino', date: '15/10/2020 16:15', icon: 'bi bi-car-front', color: '#b473ff' },
        ];
        break;
      case 3:
        this.events = [
          { status: 'Esperando', date: '15/10/2020 10:30', icon: 'bi bi-cart', color: '#cfa6ff' },
          { status: 'Preparando', date: '15/10/2020 14:00', icon: 'bi bi-gear', color: '#c08aff' },
          { status: 'En camino', date: '15/10/2020 16:15', icon: 'bi bi-car-front', color: '#b473ff' },
          { status: 'Finalizado', date: '16/10/2020 10:00', icon: 'bi bi-check', color: '#a95eff' }
        ];
        break;
      case 7:
        this.events = [
          { status: 'Esperando', date: '15/10/2020 10:30', icon: 'bi bi-cart', color: '#cfa6ff' },
          { status: 'Preparando', date: '15/10/2020 14:00', icon: 'bi bi-gear', color: '#c08aff' },
          { status: 'En camino', date: '15/10/2020 16:15', icon: 'bi bi-car-front', color: '#b473ff' },
          { status: 'Confirmacion', date: '16/10/2020 10:00', icon: 'bi bi-clock', color: '#a95eff' }
        ];
        break;
      case 8:
        this.events = [
          { status: 'Esperando', date: '15/10/2020 10:30', icon: 'bi bi-cart', color: '#cfa6ff' },
          { status: 'Preparando', date: '15/10/2020 14:00', icon: 'bi bi-gear', color: '#c08aff' },
          { status: 'En camino', date: '15/10/2020 16:15', icon: 'bi bi-car-front', color: '#b473ff' },
          { status: 'Confirmacion', date: '16/10/2020 10:00', icon: 'bi bi-clock', color: '#a95eff' }
        ];
        break;
      default:
        break;
    }
  }

  whatUUID(): string {
    if(localStorage.getItem('uu0x0')){
      return localStorage.getItem('uu0x0')!;
    }
    else if(sessionStorage.getItem('uu0x0')){
      return sessionStorage.getItem('uu0x0')!; 
    }
    else{
      return 'undefined';
    }
  }

  itsMeInvitation(){
    const packet = {
      _uuid: this.whatUUID(),
      _idshop: this.servicePacket.id_shop0x4
    }

    this._service.invitation_me(packet).subscribe((data: any) => {
      if(data.its === true){
        this.laststep = false;
      }
    }, (error: any) => {
      console.error(error);
      Notiflix.Notify.failure('Aveces ocurren errores, y hoy no pudimos identificar el estado final de tu servicio:(', {
        position: 'center-bottom'
      })
    });
  }

  confirmInvitation(){
    
    const packet = {
      _uuid: this.whatUUID(),
      _idshop: this.servicePacket.id_shop0x4,
      _sp: true
    }

    this._service.invitation(packet).subscribe((data: any) => {
      if(data.success === true){
        window.location.reload();
      }
      else if(data.agree === true){
        window.location.reload();
      }
    }, (error: any) => {
      console.error(error);
      Notiflix.Notify.failure('Aveces ocurren errores, y hoy no pudimos actualizar el estado final de tu servicio:(', {
        position: 'center-bottom'
      })
      this._dynamic.close()
    });
  }

  getMessage(status: number): string{
    switch (status){
      case 0:
        return 'El comprador solicito tu servicio.';
      case 1:
        return 'Haz indicado que estas preparándote para asistir.';
      case 2:
        return 'Indicaste que estas en camino hacia la locación.';
      case 3:
        return 'Haz finalizado el servicio.';
      case 7:
        return 'Esperando la confirmación de asistencia del comprador.'
      case 8:
        return 'Esperando tu confirmación de asistencia.'
      default:
        return 'Desconocido';
    }
  }

  getSubMessage(status: number): string{
    switch (status){
      case 0:
        return 'Puedes decidir sobre si aceptar o cancelar el servicio.';
      case 1:
        return 'Informará al comprador que estas preparándote para asistirle.';
      case 2:
        return 'Esto informo al comprador que vas de camino a su casa, en este punto necesitaremos de la verificación del comprador para continuar.';
      case 3:
        return 'Haz finalizado el servicio.';
      case 7:
          return 'Estamos esperando la confirmación de asistencia del comprador para terminar con el pedido.'  
      case 8:
        return 'Estamos esperando tu confirmación de asistencia para terminar con el pedido, vamos!'
      default:
        return 'Desconocido';
    }
  }

  ngOnInit(): void {
    this.servicePacket = this._config.data.servicePacket;

    this.getInvoiceInfo();
    this.getSub();

    this.formatStatus(this.servicePacket.completed0x12);
    this.itsMeInvitation();
  }
}
