import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ServicesGestorService } from '../../services/api/services-gestor.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DetailsCancelComponent } from '../../components/details-cancel/details-cancel.component';
import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';
import { Title } from '@angular/platform-browser';
import { DetailsOwnComponent } from '../../components/details-own/details-own.component';
import { DetailsPointsComponent } from '../../components/details-points/details-points.component';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css'],
  providers: [MessageService]
})
export class ShopsComponent implements OnInit{
  protected items: MenuItem[];

  protected purchases: any;

  private currentDate: Date = new Date();
  
  protected pendingPurchases: any;
  protected completePurchases: any;
  protected canceledPurchases: any;
  protected laststep: boolean = true;

  private ref: DynamicDialogRef | undefined;
  private ref2: DynamicDialogRef | undefined;
  private ref3: DynamicDialogRef | undefined;

  protected anything: boolean = true;

  constructor(private _shops: ServicesGestorService, private _message: MessageService, private _dialog: DialogService, private title: Title){

    this.title.setTitle('Mis compras | HomeServices®');

    this.items = [{
      label: 'Filtros',
      icon: 'bi bi-funnel',
      items: [{
        label: 'Ordenar alfabeticamente (A-Z)',
        icon: 'bi bi-sort-alpha-up',
      },
      {
        label: 'Ordenar alfabeticante (Z-A)',
        icon: 'bi bi-sort-alpha-up-alt',
      }
    ]
    }];
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

  getNameFromUUID(uuid: string): string | undefined {
    for(let i = 0; i < this.purchases.resultS.length; i++){
      if(this.purchases.resultS[i].uuid0x0 === uuid){
        return this.purchases.resultS[i].name0x3;
      }
    }
    return undefined;
  }

  getSeverity(step: number): string{
    switch(step){
      case 0:
        return 'warning';
      case 1:
        return 'info';
      case 2:
        return 'info';
      case 3:
        return 'success';
      case 4:
        return 'danger';
      case 5:
        return 'success';
      case 6:
        return 'danger';
      case 7:
        return 'warning';
      case 8:
        return 'warning';
      default:
        return '';
    }
  }

  confirmInvitation(data: string){
    
    Notiflix.Loading.dots('Confirmando...',{
      clickToClose: false,
      svgColor: '#a95eff',
      className: 'font-b',
      backgroundColor: '#fff',
      messageColor: '#000'
    })

    const packet = {
      _uuid: this.whatUUID(),
      _idshop: data
    }

    this._shops.invitation(packet).subscribe((data: any) => {
      if(data.success === true){
        Notiflix.Loading.remove();
        window.location.reload();
      }
      else if(data.agree === true){
        Notiflix.Loading.remove();
        window.location.reload();
      }
    }, (error: any) => {
      console.error(error);
      Notiflix.Notify.failure('Aveces ocurren errores, y hoy no pudimos actualizar de tu servicio:(', {
        position: 'center-bottom'
      })
    });
  }

  getPurchases(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const data = {
        _uuid: this.whatUUID()
      }
  
      this._shops.getMyOwnServices(data).subscribe((res: any) => {
        if(res.get === true){
          this.purchases = res;
          resolve(true);
        }
        else{
          if(res.nothing === true){
            resolve(false);
          }
          else{
            this._message.add({severity: 'error', summary: 'Error', detail: 'Aurora Studios Web Services ha fracasado al cargar los servicios'})
            reject(false);
          }
        }
      },  (err: any) => {
        console.log(err);
        this._message.add({severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error al cargar los servicios'})
        reject(false);
      });
    });
  }

  getCurrentMessage(step: number): string{
    switch(step){
      case 0:
        return 'Esperando a que el prestador acepte la solicitud.';
      case 1:
        return 'El prestador se esta preparando para el servicio.';
      case 2:
        return 'El prestador se encuentra en camino al lugar del servicio.';
      case 3:
        return 'El servicio ha finalizado, puedes calificar al prestador.';
      case 4: 
        return 'El servicio ha sido cancelado. Tu reembolso se encuentra en proceso.';
      case 5:
        return 'El servicio ha finalizado y has calificado al prestador.';
      case 6:
        return 'El servicio ha sido cancelado por el presta-servicios. Tu reembolso se encuentra en proceso.';
      case 7:
        return 'Se esta esperando tu confirmación de asistencia sobre el presta-servicios.';
      case 8:
        return 'Se esta esperando la confirmación de asistencia del presta-servicios.';
      default:
        return 'Estado desconocido';
    }
  }

  getSmallMessage(step: number): string{
    switch(step){
      case 0:
        return 'Esperando';
      case 1:
        return 'Preparando';
      case 2:
        return 'En camino';
      case 3:
        return 'Finalizado';
      case 4: 
        return 'Cancelado';
      case 5: 
        return 'Finalizado y opinado';
      case 6: 
        return 'Cancelado';
      case 7:
        return 'Esperando';
      case 8:
        return 'Esperando';
      default:
        return 'Desconocido';
    }
  }

  openDialogCancel(uuid: string): void {
    this.ref = this._dialog.open(DetailsCancelComponent, {
      header: '¿Cancelar servicio?',
      width: '50%',
      height: '100%',
      data: {
        _id: uuid
      },
      closable: false,
      closeOnEscape: false,
    });

    this.ref.onClose.subscribe((data: any) => {
      if(data.canceled === true){
        this.pendingPurchases = [];
        this.purchases = [];
        this.completePurchases = [];
        this.canceledPurchases = [];

        this.ngOnInit();
      }
    });
  }

  openDetails(packet: any): void{
    this.ref2 = this._dialog.open(DetailsOwnComponent, {
      header: 'Acerca de...',
      width: '40%',
      height: '100%',
      data: {
        data: packet,
        name: this.getNameFromUUID(packet.data1)
      }
    })
  }

  openReputation(uuid: string, id_shop: string, owner: string): void{
    this.ref3 = this._dialog.open(DetailsPointsComponent, {
      header: 'Opina sobre ' + this.getNameFromUUID(uuid),
      width: '40%',
      height: '100%',
      data: {
        shop: id_shop,
        name: this.getNameFromUUID(uuid),
        owner: owner
      }
    })
  }

  transformData(dateServer: string): string{
    const date = new Date(dateServer);

    // Calcula la diferencia en días, meses y años
    const daysDifference = differenceInDays(this.currentDate, date);
    const monthsDifference = differenceInMonths(this.currentDate, date) % 12;
    const yearsDifference = differenceInYears(this.currentDate, date);

    let message = '';

    if (yearsDifference > 0) {
      message = 'Contradado hace ' + yearsDifference + (yearsDifference > 1 ? ' años' : ' año');
    } 
    else if (monthsDifference > 0) {
      message = 'Contratado hace ' + monthsDifference + (monthsDifference > 1 ? ' meses' : ' mes');
    } 
    else if (daysDifference === 0){
      message = 'Contratado hoy';
    }
    else {
      message = 'Contratado hace ' + daysDifference + (daysDifference > 1 ? ' días' : ' día');
    }

    return message
  }

  secureServices(dateServer: string): boolean {
    const date = new Date(dateServer);

    const daysDifference = differenceInDays(this.currentDate, date);

    if(daysDifference < 7){
      return true;
    }
    else{
      return false;
    }
  }

  async ngOnInit(){

    const iscomplete = await this.getPurchases();
    
    if(iscomplete === true){
      for(let i = 0; i < this.purchases.resultQ.length; i++){
        this.pendingPurchases = this.purchases.resultQ.filter((item: any) => {
          if(item.data11 < 3 || item.data11 === 7 || item.data11 === 8){
            return item;
          }
        });
        this.canceledPurchases = this.purchases.resultQ.filter((item: any) => {
          if(item.data11 === 4 || item.data11 === 6){
            return item;
          }
        });
        this.completePurchases = this.purchases.resultQ.filter((item: any) => {
          if(item.data11 === 3 || item.data11 === 5){
            return item;
          }
        });
      }
    }
    else{
      this.anything = false;
    }
  }
}
