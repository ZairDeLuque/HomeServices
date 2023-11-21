import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryGestorService } from '../../services/api/category-gestor.service';
import { ServicesGestorService } from '../../services/api/services-gestor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsersgestorService } from '../../services/api/usersgestor.service';
import { Title } from '@angular/platform-browser';
import * as Notiflix from 'notiflix';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExplicitModuleComponent } from '../../components/explicit-module/explicit-module.component';
import { ApiManagerService } from '../../services/chat/api-manager.service';

@Component({
  selector: 'app-services-view',
  templateUrl: './services-view.component.html',
  styleUrls: ['./services-view.component.css'],
  providers: [DialogService, MessageService]
})
export class ServicesViewComponent implements OnInit, OnDestroy{

  protected categoryShowed: string | undefined;
  protected nameShowed: string | undefined;
  protected priceShowed: number | undefined;
  protected priceShowed_Boolean: boolean = true;
  protected priceBShowed: string | undefined;
  protected descriptionShowed: string | undefined;  

  protected servicerName: string | undefined;
  protected servicerDecimal: number | undefined;
  protected servicerUUID: string | undefined;
  protected servicerLetter: string | undefined;
  protected servicerImage: string | undefined;
  protected ifservicerImage: boolean = true;
  protected servicerStatus: string | undefined;
  protected servicerKlass: string | undefined;

  protected spinner: boolean = false;

  private categories: any;
  protected imagesBlob: any[] = [];

  private ref: DynamicDialogRef | undefined;

  protected activeID: string | undefined;

  constructor(private readonly _categories: CategoryGestorService, private readonly _servicesManager: ServicesGestorService, private readonly AR: ActivatedRoute, private NG_MSG: MessageService, private readonly userManager: UsersgestorService, private title: Title, private DialogS: DialogService, private ManagerChats: ApiManagerService, private rt: Router){}

  findInfoSeller(uuid: string){
    const packet = {
      "_uuid": uuid
    }

    this.userManager.getTinyInformation(packet).subscribe(
      result => {
        
        this.ifURLPic(result.result.pp0x1);

        this.servicerName = result.result.fn0x0;
        this.servicerLetter = result.result.fn0x0.charAt(0);
        this.servicerImage = result.result.pp0x1;
        this.servicerDecimal = result.result.rep0x2;

        if(result.result.verify0x3 == 1){
          this.servicerStatus = 'Vendedor seguro de HomeServices®️'
          this.servicerKlass = 'mb-0 text-dark'
        }
        else if(result.result.verify0x3 == 2){
          this.servicerStatus = 'Vendedor oficial de HomeServices®️'
          this.servicerKlass = 'mb-0 text-success'
        }
        else{
          this.servicerStatus = 'Vendedor no verificado de HomeServices®️'
          this.servicerKlass = 'mb-0 text-danger'
        }
        
      },
      error => {
        console.error(error)
        this.NG_MSG.add({severity: 'error', summary: 'Error', detail: 'Error al cargar la información del vendedor.'})
      }
    )
  }

  shop(){
    const isLogged = this.whatUUID();

    if(isLogged != 'undefined'){

      Notiflix.Loading.dots('Preparando todo para tu compra...',{
        clickToClose: false,
        svgColor: '#a95eff',
        className: 'font-b',
        backgroundColor: '#fff',
        messageColor: '#000'
      })

      this.rt.navigateByUrl('/services/buy/payment/method/' + this.activeID)
    }
    else{
      this.rt.navigateByUrl('/notaccount')
    }
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

  ifURLPic(string: string){
    if(string === 'notassign'){
      this.ifservicerImage = false;
    }
    else{
      this.ifservicerImage = true;
    }
  }

  getCategories(): Promise<any>{
    return new Promise((res, rej) => {
      this._categories.getCategories().subscribe(
        result => {
          if(result.ok === true){
            this.categories = result.data;
            res(true)
            // console.log(this.categories)
          }
          else{
            this.NG_MSG.add({severity: 'error', summary: 'Error', detail: 'Error de conexión al cargar las categorías en la base de datos.'})
            rej(false)
          }
        },
        error => {
          console.error(error);
          this.NG_MSG.add({severity: 'error', summary: 'Error', detail: 'Error al cargar las categorías para el servicio'})
          rej(false)
        }
      )
    })
  }

  async ngOnInit(){
    Notiflix.Loading.dots('Cargando contenido...',{
      clickToClose: false,
      svgColor: '#a95eff',
      className: 'font-b',
      backgroundColor: '#fff',
      messageColor: '#000'
    })

    const uuid = this.AR.snapshot.params['uuid'];

    this.activeID = uuid;

    const packet = {
      _uuid0x: uuid
    }

    const alreadyCategories = await this.getCategories();

    if(alreadyCategories === true){
      this._servicesManager.getServices_inside(packet).subscribe(
        async result => {
          this.nameShowed = result.result[0].name0x3;
          this.descriptionShowed = result.result[0].description0x4;
          
          this.findInfoSeller(result.result[0].owner0x1);
  
          if(result.result[0].ttp0x6 == 'Pago único' && this.priceShowed == 0){
            this.priceShowed_Boolean = false;
          }
          else{
            this.priceShowed_Boolean = true;
            this.priceShowed = result.result[0].price0x5;
            this.priceBShowed = 'Pago / ' + result.result[0].ttp0x6;
          }
  
          if(result.result[0].explicit0x10 == 'y'){
  
          }
  
          if(Array.isArray(this.categories)) {
            this.categoryShowed = await this.findTheParent(this.categories, result.result[0].category0x2);
          }
  
          this.servicerUUID = result.result[0].owner0x1;
          
          this.title.setTitle(this.nameShowed + ' | HomeServices®️')
          
          this.imagesBlob = result.pics;

          Notiflix.Loading.remove();
        },
        error => {
          console.error(error)
          this.NG_MSG.add({severity: 'error', summary: 'Error', detail: 'Error al cargar la información del servicio'})
        }
      )
    }
  }

  showDialog(){
    this.ref = this.DialogS.open(ExplicitModuleComponent, {
      header: 'Contenido explicito',
      width: '75%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    })

    this.ref.onClose.subscribe(() => {
      
    })
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

  generateNewRoom(){
    const isLogged = this.whatUUID();

    if(isLogged != 'undefined'){
      this.spinner = true;

      const json = {
        r0x: this.servicerUUID,
        s0x: this.whatUUID(),
        _t0: this.nameShowed,
        _lm0: 'undefined'
      }

      this.ManagerChats.createNewRoom(json).subscribe(
        result => {
          this.spinner = false;
          this.NG_MSG.add({severity: 'success', summary: '¡Genial!', detail: 'Se ha creado la sala de chat con éxito.'})
        },
        error => {
          this.NG_MSG.add({severity: 'error', summary: 'Oh oh:(', detail: 'Los servicios de Aurora Studios no han sido invitados a la fiesta:('})
        }
      )
    }
    else{
      this.rt.navigateByUrl('/notaccount')
    }
  }

  ngOnDestroy(): void {
      
  }
}
