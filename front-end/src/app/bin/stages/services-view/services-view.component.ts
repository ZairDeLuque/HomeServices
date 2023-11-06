import { Component, OnInit } from '@angular/core';
import { CategoryGestorService } from '../../services/api/category-gestor.service';
import { ServicesGestorService } from '../../services/api/services-gestor.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsersgestorService } from '../../services/api/usersgestor.service';
import { Title } from '@angular/platform-browser';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-services-view',
  templateUrl: './services-view.component.html',
  styleUrls: ['./services-view.component.css'],
  providers: [MessageService]
})
export class ServicesViewComponent implements OnInit{

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

  private categories: any;
  protected imagesBlob: any[] = [];

  constructor(private readonly _categories: CategoryGestorService, private readonly _servicesManager: ServicesGestorService, private readonly AR: ActivatedRoute, private NG_MSG: MessageService, private readonly userManager: UsersgestorService, private title: Title){
    
  }

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

  ngOnInit(): void {
    Notiflix.Loading.dots('Cargando contenido...',{
      clickToClose: false,
      svgColor: '#a95eff',
      className: 'font-b',
      backgroundColor: '#fff',
      messageColor: '#000'
    })

    const uuid = this.AR.snapshot.params['uuid'];

    const packet = {
      _uuid0x: uuid
    }

    this._categories.getCategories().subscribe(
      result => {
        if(result.ok === true){
          this.categories = result.data;
          // console.log(this.categories)
        }
        else{
          this.NG_MSG.add({severity: 'error', summary: 'Error', detail: 'Error de conexión al cargar las categorías en la base de datos.'})
        }
      },
      error => {
        console.error(error);
        this.NG_MSG.add({severity: 'error', summary: 'Error', detail: 'Error al cargar las categorías para el servicio'})
      }
    )

    this._servicesManager.getServices_inside(packet).subscribe(
      async result => {
        this.nameShowed = result.result[0].name0x3;
        this.descriptionShowed = result.result[0].description0x4;
        
        this.findInfoSeller(result.result[0].owner0x1);
        
        if(result.result[0].ttp0x6 != 'Pago único' && this.priceShowed != 0){
          this.priceShowed = result.result[0].price0x5;
          this.priceBShowed = 'Pago / ' + result.result[0].ttp0x6;
        }
        else{
          this.priceShowed_Boolean = false;
        }

        if(Array.isArray(this.categories)) {
          this.categoryShowed = await this.findTheParent(this.categories, result.result[0].category0x2);
        }

        this.servicerUUID = result.result[0].owner0x1;
        
        this.title.setTitle(this.nameShowed + ' | HomeServices®️')
        
        Notiflix.Loading.remove();
      },
      error => {
        console.error(error)
        this.NG_MSG.add({severity: 'error', summary: 'Error', detail: 'Error al cargar la información del servicio'})
      }
    )

  }
}
