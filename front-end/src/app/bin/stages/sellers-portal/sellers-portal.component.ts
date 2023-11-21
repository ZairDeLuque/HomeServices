import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Homestep2Component } from '../homestep2/homestep2.component';
import { ServicesGestorService } from '../../services/api/services-gestor.service';
import { MessageService } from 'primeng/api';
import { CategoryGestorService } from '../../services/api/category-gestor.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-sellers-portal',
  templateUrl: './sellers-portal.component.html',
  styleUrl: './sellers-portal.component.css',
  providers: [DialogService, MessageService]
})
export class SellersPortalComponent implements OnInit{

  private ref: DynamicDialogRef | undefined;

  private categories: any[] = [];
  protected products: any[] = [];
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

  async ngOnInit() {
    const json = {
      _own: this.whatUUID()
    }

    const categorysReady = await this.getCategorys();

    if(categorysReady === true){
      this._services.getServicesSP(json).subscribe((data: any) => {

        Notiflix.Loading.dots('Descargando datos...',{
          clickToClose: false,
          svgColor: '#a95eff',
          className: 'font-b',
          backgroundColor: '#fff',
          messageColor: '#000'
        })
        
        if(data.getter === true){
          data.result.forEach(async (element: any) => {
            const service: any = {
              uuid0x0: element.uuid0x0,
              category0x2: await this.findTheParent(this.categories ,element.category0x2),
              name0x3: element.name0x3,
              price0x5: element.price0x5,
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
    }
  }
}
