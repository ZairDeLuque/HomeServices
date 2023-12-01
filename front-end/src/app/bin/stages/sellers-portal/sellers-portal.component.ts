import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Homestep2Component } from '../homestep2/homestep2.component';
import { ServicesGestorService } from '../../services/api/services-gestor.service';
import { MessageService } from 'primeng/api';
import { CategoryGestorService } from '../../services/api/category-gestor.service';
import * as Notiflix from 'notiflix';
import { DeletePopupComponent } from '../../components/sellersportal/delete-popup/delete-popup.component';
import { DetailsPopupComponent } from '../../components/sellersportal/details-popup/details-popup.component';

@Component({
  selector: 'app-sellers-portal',
  templateUrl: './sellers-portal.component.html',
  styleUrl: './sellers-portal.component.css',
  providers: [DialogService, MessageService]
})
export class SellersPortalComponent implements OnInit{

  private ref: DynamicDialogRef | undefined;
  private ref2: DynamicDialogRef | undefined;
  private ref3: DynamicDialogRef | undefined;

  protected stats1: number = 0;
  protected stats2: number = 0;
  protected stats3: number = 0;

  private categories: any[] = [];
  protected products: any[] = [];
  protected top1: any[] = [];
  protected top2: any[] = [];
  protected uncomplete: any[] = [];
  protected somebody: boolean = true;

  constructor(private title: Title, public _dialog: DialogService, private _services: ServicesGestorService, private NG_MSG: MessageService, private _categories: CategoryGestorService){
    this.title.setTitle('Portal de vendedores | HomeServices®');
  }

  whatUUID(): string {
    if(localStorage.getItem('uu0x0')){
      return localStorage.getItem('uu0x0')!;
    }
    else{
      return sessionStorage.getItem('uu0x0')!; 
    }
  }

  openDetailsUncomplete(packet: any){
    this.ref3 = this._dialog.open(DetailsPopupComponent, {
      header: 'Detalles',
      width: '80%',
      height: '100%',
      data: {
        servicePacket: packet
      }
    })
  }

  openCreateNewService(){
    this.ref = this._dialog.open(Homestep2Component, {
      header: 'Crear nuevo servicio',
      width: '90%',
      height: '100%',
      closeOnEscape: false,
      closable: false,
    });

    this.ref.onClose.subscribe((data: any) => {
      if(data.upload === true){
        window.location.reload();
      }
    })
  }

  getSeverity(status: string) {
    switch (status) {
      case 'ACTIVO':
        return 'success';
      case 'EN REVISION':
        return 'warning';
      case 'INACTIVO':
        return 'danger';
      default: 
        return '';
    }
  }

  getSeverity_Text(status: number): Promise<string>{
    return new Promise((resolve, reject) => {
      switch (status) {
        case 1:
          resolve('ACTIVO');
          return;
        case 0:
          resolve('EN REVISION');
          return;
        case 2:
          resolve('INACTIVO');
          return;
        default: 
          resolve('');
      }
    })
  }

  findTheParent(array: any[], finder: string): Promise<string>{
    return new Promise((resolve, reject) => {
      for(let i = 0; i < array.length; i++){
        if(array[i].codename0x1.includes(finder)){
          resolve(array[i].name0x0)
          break;
        }
      }

      reject('Not finded')
    })
  }

  getCategorys(): Promise<any>{
    return new Promise((res, rej) => {
      this._categories.getCategories().subscribe(
        result => {
          if(result.ok === true){
            this.categories = result.data;
            res(true);
          }
          else{
            this.NG_MSG.add({severity: 'error', summary: 'Error', detail: 'Error de conexión al descargar las categorías en la base de datos.'})
            rej(false);
          }
        },
        error => {
          console.error(error);
          this.NG_MSG.add({severity: 'error', summary: 'Error', detail: 'Error al descargar las categorías para el servicio.'})
          rej(false);
        }
      )
    })
  }

  openDeleteDialog(uuid: string, name: string, status: string){
    this.ref2 = this._dialog.open(DeletePopupComponent, {
      header: 'Eliminar servicio',
      width: '50%',
      height: '40%',
      closeOnEscape: false,
      closable: false,
      data: {
        uuid: uuid,
        name: name,
        status: status
      }
    })

    this.ref2.onClose.subscribe((data: any) => {
      if(data.deleted === true){
        window.location.reload();
      }
    })
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
    const formattedDateTime = `${hours}:${minutes} ${day}/${month}/${year}`;
    return formattedDateTime;
  }

  getTopsSells(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      const json = {
        _own: this.whatUUID(),
        activity: 'DESC'
      }
      
      this._services.getTopsSells(json).subscribe((data: any) => {
        if(data.getter === true){
          data.result.forEach(async (element: any) => {
            
            const service: any = {
              uuid0x0: element.uuid0x0,
              category0x2: await this.findTheParent(this.categories,element.category0x2),
              name0x3: element.name0x3,
              price0x5: element.price0x5,
              date0x7: this.formatDate(element.date0x7),
              status0x8: await this.getSeverity_Text(element.status0x8),
              priceB0x9: element.priceB0x9,
              explicit0x10: element.explicit0x10,
            }
  
            this.top1.push(service);
          });

          resolve(true)
        }
        else{
          resolve(true);
        }
      }, (error: any) => {
        console.error(error);
        Notiflix.Notify.failure('No se pudo obtener la información de los tops-servicios.', {
          position: 'center-bottom'
        });
        reject(false);
      })
    })
  }

  getTopsSells2(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      const json = {
        _own: this.whatUUID(),
        activity: 'ASC'
      }
      
      this._services.getTopsSells(json).subscribe((data: any) => {
        if(data.getter === true){
          data.result.forEach(async (element: any) => {
            
            const service: any = {
              uuid0x0: element.uuid0x0,
              category0x2: await this.findTheParent(this.categories,element.category0x2),
              name0x3: element.name0x3,
              price0x5: element.price0x5,
              date0x7: this.formatDate(element.date0x7),
              status0x8: await this.getSeverity_Text(element.status0x8),
              priceB0x9: element.priceB0x9,
              explicit0x10: element.explicit0x10,
            }
  
            this.top2.push(service);
          });

          resolve(true)
        }
        else{
          resolve(true);
        }
      }, (error: any) => {
        console.error(error);
        Notiflix.Notify.failure('No se pudo obtener la información de los tops-servicios.', {
          position: 'center-bottom'
        });
        reject(false);
      })
    })
  }

  getUncompleteTasks(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      const packet = {
        _uuid: this.whatUUID()
      }

      this._services.getUncompletedServicesSP(packet).subscribe((data: any) => {
        if(data.get === true){
          this.stats2 = data.result.length;
          this.uncomplete = data.result;
          resolve(true);
        }
        else{
          resolve(false);
        }
      }, (error: any) => {
        console.error(error);
        Notiflix.Notify.failure('No se pudo obtener la información de los servicios.', {
          position: 'center-bottom'
        });
        reject(false);
      })
    })
  }

  getSmartData(){
    const packet = {
      _uuid: this.whatUUID()
    }

    this._services.smart(packet).subscribe((data: any) => {
      if(data.success === true){
        this.stats1 = data.data[0].TS;
        
        if(data.data[0].SM !== null){
          this.stats3 = data.data[0].SM;
        }
        else{
          this.stats3 = 0;
        }
      }
      else{
        this.stats1 = 0;
        this.stats3 = 0;
      }
    }, (error: any) => {
      console.error(error);
      Notiflix.Notify.failure('No se pudo obtener la información basica de tu portal.', {
        position: 'center-bottom'
      });
    });
  }

  async ngOnInit() {
    const json = {
      _own: this.whatUUID()
    }

    const categorysReady = await this.getCategorys();

    if(categorysReady === true){

      this._services.getServicesSP(json).subscribe((data: any) => {

        Notiflix.Loading.remove(1000);
        
        if(data.getter === true){
          data.result.forEach(async (element: any) => {
            const service: any = {
              uuid0x0: element.uuid0x0,
              category0x2: await this.findTheParent(this.categories ,element.category0x2),
              name0x3: element.name0x3,
              price0x5: element.price0x5,
              date0x7: this.formatDate(element.date0x7),
              status0x8: await this.getSeverity_Text(element.status0x8),
              priceB0x9: element.priceB0x9,
              explicit0x10: element.explicit0x10,
            }
  
            this.products.push(service);
          });
          
        }

        if(data.nothing == true){
          this.somebody = false;
        }

        Notiflix.Loading.remove(1000);
      }, (error: any) => {
        console.error(error)
        this.NG_MSG.add({severity: 'error', summary: 'Error', detail: 'No se pudo obtener la información de los servicios:('})
      })

      const topsA = await this.getTopsSells();
      if(topsA === false){
        this.NG_MSG.add({severity: 'error', summary: 'Error', detail: 'No se pudo obtener la información de los tops-servicios:('})
      }
      const topsB = await this.getTopsSells2();
      if(topsB === false){
        this.NG_MSG.add({severity: 'error', summary: 'Error', detail: 'No se pudo obtener la información de los tops-servicios:('})
      }
    }

    const uncompletedTasks = await this.getUncompleteTasks();
    
    this.getSmartData();

    if(uncompletedTasks === true){
      if(this.stats2 > 0){
        // this.openDetailsUncomplete(this.uncomplete[0]);
        this.NG_MSG.add({severity: 'warn', summary: 'Advertencia', detail: 'Tienes servicios sin completar, por favor, completa los servicios para que puedas recibir pagos.'})
      }
    }
  }
}
