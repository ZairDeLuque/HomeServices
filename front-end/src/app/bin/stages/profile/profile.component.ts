import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersgestorService } from '../../services/api/usersgestor.service';
import { MessageService } from 'primeng/api';
import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';
import * as Notiflix from 'notiflix';
import { ServicesGestorService } from '../../services/api/services-gestor.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit{
  protected UUIDactive: string;
  
  protected name: string = '';
  protected isURLPic: boolean = false;
  protected nameLetter: string = '';
  protected URLimage: string = '';

  protected reputationValue: number = 0;

  protected reputationValueAttention: number = 0;
  protected attencion: string = '';

  protected buysSeverity: number = 0;
  protected buys: string = '';

  protected reviews: any;

  protected sells: number = 0;

  protected verify: number = 0;

  private currentDate: Date = new Date();
  protected message: string = '';
  
  protected services: any[] = [];

  constructor(private title: Title, private ar: ActivatedRoute, private _API_:UsersgestorService, private NG_MSG: MessageService, private router: Router, private _services: ServicesGestorService) {
    this.UUIDactive = this.ar.snapshot.params['uuid']
  }

  transformData(dateServer: string){
    const date = new Date(dateServer);

    // Calcula la diferencia en días, meses y años
    const daysDifference = differenceInDays(this.currentDate, date);
    const monthsDifference = differenceInMonths(this.currentDate, date) % 12;
    const yearsDifference = differenceInYears(this.currentDate, date);

    let message = '';

    if (yearsDifference > 0) {
      message = yearsDifference + (yearsDifference > 1 ? ' años' : ' año');
    } 
    else if (monthsDifference > 0) {
      message = monthsDifference + (monthsDifference > 1 ? ' meses' : ' mes');
    } 
    else if (daysDifference === 0){
      message = 'Es nuevo usuario'
    }
    else {
      message = daysDifference + (daysDifference > 1 ? ' días' : ' día');
    }

    this.message = message + ' en HomeServices®️';
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

  getMessage(verification: number):string{
    switch(verification){
      case 1:
        return 'Vendedor seguro de HomeServices®️';
      case 2:
        return 'Vendedor oficial de HomeServices®️';
      default:
        return 'Vendedor no verificado de HomeServices®️';
    }
  }

  getStylesMessage(verification: number):string{
    switch(verification){
      case 1:
        return 'mb-0 text-dark';
      case 2:
        return 'mb-0 text-success';
      default:
        return 'mb-0 text-danger';
    }
  }

  getSeverity(value: number): string{
    switch(value){
      case 1:
        return 'danger';
      case 2:
        return 'danger';
      case 3:
        return 'warn';
      case 4:
        return 'success';
      case 5:
        return 'success';
      default:
        return 'info';
    }
  }

  getReviews(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      Notiflix.Loading.dots('Descargando datos...',{
        clickToClose: false,
        svgColor: '#a95eff',
        className: 'font-b',
        backgroundColor: '#fff',
        messageColor: '#000'
      })

      const packet = {
        _u0x: this.UUIDactive
      }
  
      this._API_.getReviews_Profile(packet).subscribe((result: any) => {
        if(result.get === true){
          if(result.data.length > 0){
            Notiflix.Loading.remove();
            this.reviews = result.data;
            resolve(true)
          }
          else{
            Notiflix.Loading.remove();
            this.reviews = [];
            this.NG_MSG.add({severity: 'warn', summary: '¡Cuidado!', detail: 'Este usuario no tiene reseñas. Puede ser nuevo...igual es mejor tener cuidado.', closable: true})
            resolve(true)
          }
        }
        else{
          this.NG_MSG.add({severity: 'error', summary: 'Error:(', detail: 'Los servicios han fallado, intente recargar la pagina.', closable: true})
          Notiflix.Loading.remove();
          reject(false)
        }
      }, (error:any) => {
        console.error(error)
        Notiflix.Loading.remove();
        this.NG_MSG.add({severity: 'error', summary: 'Error:(', detail: 'Los servicios han fallado, intente recargar la pagina.', closable: true})
        reject(false)
      })
    })
  }

  formatReputationValue(): number{
    let convertion = 0;
    
    for(let i = 0; i < this.reviews.length; i++){
      convertion += this.reviews[i].data0x5;
    }

    const reputation = convertion / this.reviews.length;

    return (
      (0.4 * this.buysSeverity) +
      (0.4 * this.reputationValueAttention) +
      (0.2 * reputation)
    );
  }

  formatReputationBValue(): Promise<number>{
    return new Promise((resolve, reject) => {
      let convertion = 0;
    
      for(let i = 0; i < this.reviews.length; i++){
        convertion += this.reviews[i].data0x2;
      }

      resolve(convertion / this.reviews.length)
    })
  }

  formatReputationCValue(): Promise<number>{
    return new Promise((resolve, reject) => {
      let convertion = 0;
    
      for(let i = 0; i < this.reviews.length; i++){
        convertion += this.reviews[i].data0x4;
      }

      resolve(convertion / this.reviews.length)
    })
  }

  getData(){
    const packet = {
      _uuid: this.UUIDactive
    }

    this._API_.obtainUserData(packet).subscribe(
      result => {
        if(result.exists === false){
          this.router.navigate(['/404'])
        }
        else{
          this.name = result.result.fn0x4;
          this.title.setTitle(this.name + ' | HomeServices®️')

          this.verify = result.result._v0x2;

          if(result.result.pp0x5 === 'notassign'){
            this.isURLPic = false;
            this.nameLetter = this.name.charAt(0);
          }
          else{
            this.isURLPic = true;
            this.URLimage = result.result.pp0x5;
          }

          this.transformData(result.result.date0x6)
        }
      },
      error => {
        console.error(error)
        this.NG_MSG.add({severity: 'error', summary: 'Error:(', detail: 'Los servicios han fallado, intente recargar la pagina.', closable: true})
      }
    )
  }

  convertStringfy(value: any, method: number): string{ 
    if(method === 0){
      if(value == 1){
        return 'muy malas';
      }
      else if(value == 2){
        return 'malas';
      }
      else if(value == 3){
        return 'mas o menos';
      }
      else if(value == 4){
        return 'buenas';
      }
      else if(value == 5){
        return 'muy buenas';
      }
      else{
        return 'sin calificar';
      }
    }
    else{
      if(value == 1){
        return 'muy malos e ineficientes';
      }
      else if(value == 2){
        return 'malos';
      }
      else if(value == 3){
        return 'buenos, pero podrian mejorar';
      }
      else if(value == 4){
        return 'buenos y utiles';
      }
      else if(value == 5){
        return 'muy buenos y eficientes';
      }
      else{
        return 'indecidibles';
      }
    }

  }

  convertStringfy2(value: any, method: number): string{ 
    if(method === 0){
      if(value == 1){
        return 'Muy mala';
      }
      else if(value == 2){
        return 'Mala';
      }
      else if(value == 3){
        return 'Intermedia';
      }
      else if(value == 4){
        return 'Buena';
      }
      else if(value == 5){
        return 'Muy buena';
      }
      else{
        return 'Pendiente';
      }
    }
    else{
      if(value == 1){
        return 'muy mala y posiblemente irrespetuosa';
      }
      else if(value == 2){
        return 'mala, poco amable';
      }
      else if(value == 3){
        return 'intermedia, pero podria mejorar';
      }
      else if(value == 4){
        return 'buena, amable y respetuosa';
      }
      else if(value == 5){
        return 'muy buena, respetuosa y amable, siempre intenta ser preciso';
      }
      else{
        return 'indecidible';
      }
    }

  }

  getTotalSells(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      const packet = {
        _u0x: this.UUIDactive
      }
  
      this._API_.getSells(packet).subscribe((result: any) => {
        if(result.get === true){
          this.sells = result.number;
          resolve(true)
        }
        else{
          reject(false)
        }
      }, (error:any) => {
        console.error(error)
        reject(false)
      })
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

  getServices(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      const packet = {
        _uuid: this.UUIDactive
      }
  
      this._services.getWithUUID(packet).subscribe((result: any) => {
        if(result.get === true){
          this.services = result.result;-
          resolve(true)
        }
        else{
          reject(false)
        }
      }, (error: any) => {
        console.error(error)
        reject(false)
      })
    })
  }

  async ngOnInit(){
    const reviewsGet = await this.getReviews();

    if(reviewsGet === true){
      this.getData();

      this.buysSeverity = await this.formatReputationBValue();
      this.buys = this.getSeverity(this.buysSeverity);
      
      this.reputationValueAttention = await this.formatReputationCValue();
      this.attencion = this.getSeverity(this.reputationValueAttention);
      
      this.reputationValue = this.formatReputationValue();
    }

    const sells = await this.getTotalSells();

    if(!sells){
      this.NG_MSG.add({severity: 'error', summary: 'Error:(', detail: 'Los servicios han fallado al obtener las ventas de la cuenta, intente recargar la pagina.', closable: true})
    }
    else{
      const services = await this.getServices();

      if(!services){
        this.NG_MSG.add({severity: 'error', summary: 'Error:(', detail: 'Los servicios han fallado al obtener los servicios de la cuenta, intente recargar la pagina.', closable: true})
      }
    }
  }
}
