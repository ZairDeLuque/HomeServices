import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Notiflix from 'notiflix';
import { MessageService } from 'primeng/api';
import { UsersgestorService } from '../../services/api/usersgestor.service';
import { Title } from '@angular/platform-browser';
import { ServicesGestorService } from '../../services/api/services-gestor.service';

@Component({
  selector: 'app-inside-home',
  templateUrl: './inside-home.component.html',
  styleUrls: ['./inside-home.component.css'],
  providers: [MessageService]
})
export class InsideHomeComponent implements OnInit{

  protected City: string = '';
  protected Region: string = '';

  protected locationItems = [];

  protected topSells = [
    { title: 'Elemento 1', description: 'Este es el elemento 1' },
    { title: 'Elemento 2', description: 'Este es el elemento 2' },
    { title: 'Elemento 3', description: 'Este es el elemento 3' },
    { title: 'Elemento 4', description: 'Este es el elemento 4' },
    { title: 'Elemento 5', description: 'Este es el elemento 5' },
    { title: 'Elemento 6', description: 'Este es el elemento 6' },
    { title: 'Elemento 7', description: 'Este es el elemento 7' },
    { title: 'Elemento 8', description: 'Este es el elemento 8' },
    { title: 'Elemento 9', description: 'Este es el elemento 9' },
    { title: 'Elemento 10', description: 'Este es el elemento 10' }
  ];

  protected recomendations = [
    { title: 'Elemento 1', description: 'Este es el elemento 1' },
    { title: 'Elemento 2', description: 'Este es el elemento 2' },
    { title: 'Elemento 3', description: 'Este es el elemento 3' },
    { title: 'Elemento 4', description: 'Este es el elemento 4' },
    { title: 'Elemento 5', description: 'Este es el elemento 5' },
    { title: 'Elemento 6', description: 'Este es el elemento 6' },
    { title: 'Elemento 7', description: 'Este es el elemento 7' },
    { title: 'Elemento 8', description: 'Este es el elemento 8' },
    { title: 'Elemento 9', description: 'Este es el elemento 9' },
    { title: 'Elemento 10', description: 'Este es el elemento 10' }
  ];

  protected offs = [
    { title: 'Elemento 1', description: 'Este es el elemento 1' },
    { title: 'Elemento 2', description: 'Este es el elemento 2' },
    { title: 'Elemento 3', description: 'Este es el elemento 3' },
    { title: 'Elemento 4', description: 'Este es el elemento 4' },
    { title: 'Elemento 5', description: 'Este es el elemento 5' },
    { title: 'Elemento 6', description: 'Este es el elemento 6' },
    { title: 'Elemento 7', description: 'Este es el elemento 7' },
    { title: 'Elemento 8', description: 'Este es el elemento 8' },
    { title: 'Elemento 9', description: 'Este es el elemento 9' },
    { title: 'Elemento 10', description: 'Este es el elemento 10' }
  ];

  protected news = [
    { title: 'Elemento 1', description: 'Este es el elemento 1' },
    { title: 'Elemento 2', description: 'Este es el elemento 2' },
    { title: 'Elemento 3', description: 'Este es el elemento 3' },
    { title: 'Elemento 4', description: 'Este es el elemento 4' },
    { title: 'Elemento 5', description: 'Este es el elemento 5' },
    { title: 'Elemento 6', description: 'Este es el elemento 6' },
    { title: 'Elemento 7', description: 'Este es el elemento 7' },
    { title: 'Elemento 8', description: 'Este es el elemento 8' },
    { title: 'Elemento 9', description: 'Este es el elemento 9' },
    { title: 'Elemento 10', description: 'Este es el elemento 10' }
  ];

  constructor(private route: ActivatedRoute, private _API_: UsersgestorService, private title: Title, private NG_MSG: MessageService, private _services: ServicesGestorService){}

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

  getItemsWithLocation(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      const packet = {
        _uuid: this.whatUUID(),
      }

      this._services.getWithLocation(packet).subscribe((result: any) => {
        if(result.get === true){
          this.locationItems = result.result;
          resolve(true);
        }
        else{
          this.NG_MSG.add({severity: 'warn', summary: 'No hay servicios', detail: 'No hay servicios en tu locación.'});
          resolve(true);
        }
      }, (error: any) => {
        console.error(error);
        this.NG_MSG.add({severity: 'error', summary: 'Error', detail: 'No se pudo obtener los servicios de tu locación.'});
        reject(false);
      })
    })
  }

  getLocation(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      const packet = {
        _uuid: this.whatUUID()
      }
  
      this._API_.getLocation_2(packet).subscribe((result: any) => {
        if(result.get === true){
          this.City = result.data.c0x1;
          this.Region = result.data.s0x0;
          resolve(true);
        }
      }, (error: any) => {
        console.log(error);
        this.NG_MSG.add({severity: 'error', summary: 'Error', detail: 'No se pudo obtener tu ubicacion.'});
        reject(false);
      });
    })
  }

  padZero(number: number): string {
    return number.toString().padStart(2, '0');
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);

    const day = this.padZero(date.getDate());
    const month = this.padZero(date.getMonth() + 1); 
    const year = this.padZero(date.getFullYear() % 100);
    const formattedDateTime = `${day}/${month}/${year}`;

    return formattedDateTime;
  }

  async ngOnInit(){
    this.title.setTitle('Inicio | HomeServices®️');

    const location = await this.getLocation();
    
    if(location === false){
      this.NG_MSG.add({severity: 'warn', summary: '¿Norte, sur, este, oeste?', detail: 'No se pudo obtener tu ubicación, no podremos darte sugerencias de tu ubicación.'});
    }
    else{
      const itemsA = await this.getItemsWithLocation();

      if(itemsA === false){
        this.NG_MSG.add({severity: 'warn', summary: 'Olvidamos de donde eres:(', detail: 'No se lograron obtener servicios de tu locación actual.'});
      }
    }

    // let _param: boolean | undefined;

    // this.route.queryParams.subscribe(params => {
    //   _param = params['locate'];
    // })

    // if(_param){
    //   this._API_.getLocation().subscribe(
    //     result => {
    //       if(result.founded === true){
    //         Notiflix.Confirm.show('Estamos en lo correcto?', `Tu direccion es ${result.result.city}, ${result.result.region}.`, 'Si, esa es', 'No, quiero cambiar', () => {
              
    //         }, () => {
              
    //         })
    //       }
    //       else{
            
    //       }
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   )

    // }
  }
}
