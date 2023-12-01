/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CategoryGestorService } from '../../services/api/category-gestor.service';
import { MessageService } from 'primeng/api';
import * as Notiflix from 'notiflix';
import { v4 as uuidv4 } from 'uuid';
import { ServicesGestorService } from '../../services/api/services-gestor.service';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { OnchangeService } from '../../services/pics/onchange.service';

interface TimeSelect {
  name: string,
  code: string
}

interface Categories {
  name: string,
  code: string
}

interface Explicit {
  name: string,
  code: string
}

interface image {
  blob: any
}

@Component({
  selector: 'app-homestep2',
  templateUrl: './homestep2.component.html',
  styleUrls: ['./homestep2.component.css'],
  providers: [MessageService]
})
export class Homestep2Component implements OnInit{
  
  protected _category: any;
  protected _category_show: string | undefined;

  protected _name: string | undefined;
  protected _name_length: number = 0;
  protected _name_klass: string = 'mb-0';

  protected _description: string | undefined;
  protected _description_length: number = 0;
  protected _description_klass: string = 'mb-0';

  protected _cash: number = 0;
  protected _cash_b: any;
  protected _cash_b_show: string | undefined;
  private _cash_free_ad: boolean = false;
  private _cash_free_ad_2: boolean = false;
  protected _cashC: number = 0;

  protected _fileA: string | undefined;
  protected _fileA_length: number = 0;
  protected _fileA_all: any;
  private uploadPics: image[] = [];

  protected _explicit: any;
  protected _explicit_bool: boolean = false;
  private _explicitSelected: string | undefined;

  private uuidSavedItem: string | undefined;

  protected checkTerms: boolean = false;

  protected times: TimeSelect[];
  protected explicitOps: Explicit[] = [{name: "Si", code: "y"},{name: "No", code: "n"}];
  protected categories: Categories[] = [];

  explicitChanges(){
    if(this._explicit != undefined){
      if(this._explicit[0]){
        if(this._explicit[0].name === 'No'){
          this._explicit_bool = true;
          this._explicitSelected = this._explicit[0].name;
        }
        else{
          this._explicit_bool = false;
          this._explicitSelected = this._explicit[0].name;
        }
      }
      else{
        this._explicit_bool = false;
        this._explicitSelected = '';
      }
    }
    else{
      this._explicit_bool = false;
      this._explicitSelected = '';
    }
  }

  async onUpload() {
    if(this._fileA_length > 0){
      Notiflix.Loading.dots('Compilando y subiendo fotografías...',{
        clickToClose: false,
        svgColor: '#a95eff',
        className: 'font-b',
        backgroundColor: '#fff',
        messageColor: '#000'
      })

      for (let a = 0; a < this._fileA_length; a++) {
        try {
          const file = this._fileA_all[a];
          const data = await this._compiler.extractorSrc(file);
          const information = data.code;
          const data2 = await this._compiler.recompileSrc(information, 600, 500);
    
          const pushed: image = {
            blob: data2.code
          };
          this.uploadPics.push(pushed);
        } catch (err) {
          console.error(err);
          this.NG_MSG.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al compilar la imagen no. ' + (a + 1)
          });
        }
      }

      const JSON = {
        lengthPics: this._fileA_all.length,
        _uuid: this.uuidSavedItem,
        allImages: this.uploadPics
      }

      this._services.addPics(JSON).subscribe(
        result => {
          Notiflix.Loading.remove();

          if(result.saved === true){
            Notiflix.Notify.success(result.result, {
              position: 'center-bottom'
            });

            this._dynamic.close({upload: true});
          }
          else{
            this.NG_MSG.add({severity: 'error', summary: 'Imágenes rotas :(', detail: 'El servidor encargado ha fracasado, su publicación continua pero no tendrá fotos.'});  
          }
        },
        error => {
          Notiflix.Loading.remove();
          console.error(error);
          this.NG_MSG.add({severity: 'error', summary: 'Imágenes perdidas', detail: 'El servidor encargado ha fracasado, pruebe a refrescar la pagina.'});
        }
      )
    }
  }

  countFileSelected(event: any){
    this._fileA_length = event.currentFiles.length;
    this._fileA_all = event.currentFiles;
  }
  
  deleteFileSelected(event: any){
    if(this._fileA_length > 0){
      this._fileA_length--;

      this._fileA_all = this._fileA_all.filter((item: any) => {
        return item.name !== event.file.name;
      });
      
    }
    else{
      this._fileA_length = 0;
      this._fileA_all = [];
    }
  }

  getCategories(): Promise<any>{
    let arrayReturn: any[] = [];

    this.categoryService.getCategories().subscribe((data: any) => {
      if(data.ok === true){
        data.data.forEach((element: any) => {
          const itemCategory: Categories = {
            name: element.name0x0,
            code: element.codename0x1
          };
          arrayReturn.push(itemCategory);
        });
      }
      else{
        console.error('Not founded categories')
        this.NG_MSG.add({severity: 'error', summary: 'Categorías perdidas!', detail: 'El servidor encargado ha fracasado, pruebe a refrescar la pagina.'});
      }
    });
    
    return Promise.resolve(arrayReturn);
  }

  whatUUID(): string {
    if(localStorage.getItem('uu0x0')){
      return localStorage.getItem('uu0x0')!;
    }
    else{
      return sessionStorage.getItem('uu0x0')!; 
    }
  }

  reformatJSON(){
    const JSON = {
      _uuid0x: uuidv4(),
      _own0x: this.whatUUID(),
      ctg0x: this._category[0].code,
      n0x: this._name,
      desc0x: this._description,
      pr0x: this._cash,
      ttp0x: this._cash_b_show,
      prb0x: this._cashC,
      e0x: this._explicit[0].code
    }

    return JSON;
  }

  onSubmit(){
    if(this._category_show === '' || this._category_show === undefined){
      this.NG_MSG.add({severity: 'error', summary: 'Campos vacíos', detail: 'Parece que no haz seleccionado una categoría. Vamos ¡hay muchas de ellas!'});
      return;
    }

    if(this._name === undefined || this._name.length === 0){
      this.NG_MSG.add({severity: 'error', summary: 'Campos vacíos', detail: '¿Tu servicio no tiene nombre? ¿Como sabremos como llamarlo?'});
      return;
    }

    if(this._description === undefined || this._description.length === 0){
      this.NG_MSG.add({severity: 'error', summary: 'Campos vacíos', detail: 'Olvidaste describir tu servicio. ¡Eso es importante!'});
      return;
    }

    if(this._cash === 0){
      if(this._cash_free_ad === false){
        this.NG_MSG.add({severity: 'error', summary: 'Campos vacíos o...¿no?', detail: '¡Espera! No haz establecido un costo o...si quieres establecer un servicio gratuito puedes continuar.'});
        this._cash_free_ad = true;
        return;
      }
    }
    else{
      if(this._cash > 99999){
        this.NG_MSG.add({severity: 'info', summary: '¿Servicio infinito?', detail: 'A no ser que ofrezcas un servicio infinito o super especial, no puede valer exageradamente.'});
        return;
      }
    }

    if(this._cash_b_show === undefined || this._cash_b_show.length === 0){
      if(this._cash_free_ad === true && this._cash_free_ad_2 === false){
        this.NG_MSG.add({severity: 'info', summary: 'Campos vacíos', detail: 'Si estas seguro de tener un servicio gratuito, selecciona el tiempo de tu pago como único.'});
        this._cash_free_ad_2 = true;
        return;
      }
      else{
        this.NG_MSG.add({severity: 'error', summary: 'Campos vacíos', detail: '¡Oh vamos! Todos necesitaran saber como es tu costo por tiempo de trabajo.'});
        return;
      }
    }

    if(this._cash === 0 && this._cash_b_show != 'Pago único'){
      this.NG_MSG.add({severity: 'info', summary: 'Servicio gratis', detail: 'Si es gratis, olvidaste poner el tiempo de pago en único.'});
      return;
    }

    if(this._fileA_length < 2){
      this.NG_MSG.add({severity: 'info', summary: 'Campos vacíos', detail: 'Debes subir como mínimo 2 fotos ¡todos necesitan saber que eres confiable!.'});
      return;
    }

    if(this.checkTerms == false){
      this.NG_MSG.add({severity: 'info', summary: 'Términos ignorados:(', detail: 'Olvidaste marcar los términos de venta, ¡están sobre el botón!'});
      return;
    }

    if(this._explicitSelected === ''){
      this.NG_MSG.add({severity: 'info', summary: 'Filtros explícitos faltantes', detail: 'Olvidaste indicarnos sobre el filtro explicito, ¡están al final!'});
      return;
    }

    Notiflix.Loading.dots('Esperando servidor...',{
      clickToClose: false,
      svgColor: '#a95eff',
      className: 'font-b',
      backgroundColor: '#fff',
      messageColor: '#000'
    })

    const packet = this.reformatJSON();
    this.uuidSavedItem = packet._uuid0x;

    this._services.addNewService(packet).subscribe(result => {
      Notiflix.Loading.remove();

      this.onUpload();
    }, error => {
      console.error(error)
      Notiflix.Loading.remove();
    })
  }

  constructor(private title: Title, private categoryService: CategoryGestorService, private NG_MSG: MessageService, private readonly _services: ServicesGestorService, private readonly _router: Router, private _dynamic: DynamicDialogRef, private _compiler: OnchangeService){
    this.times = [
      {name: 'Hora', code: 'H'},
      // {name: 'Dia', code: 'D'},
      // {name: 'Semana', code: 'S'},
      {name: 'Pago único', code: 'PU'},
    ];

    this.getCategories().then((data: any) => {
      this.categories = data;
    });
  }

  ngOnInit(): void {
    this.title.setTitle('Publicar servicio | HomeServices®️')
  }

  onChangeMulti(){
    if(this._cash_b != undefined){
      if(this._cash_b[0]){
        this._cash_b_show = this._cash_b[0].name;
      }
      else{
        this._cash_b_show = ''
      }
    }
    else{
      this._cash_b_show = ''
    }
  }

  onChangeMulti2(){
    if(this._category != undefined){
      if(this._category[0]){
        this._category_show = this._category[0].name;
      }
      else{
        this._category_show = ''
      }
    }
    else{
      this._category_show = ''
    }
  }

  onCompare(){
    if(this._name != undefined){
      
      this._name_length = this._name.length;

      if(this._name?.length === 25){
        this._name_klass = 'text-danger mb-0'
      }
      else{
        this._name_klass = 'mb-0'
      }
    }
  }

  close(){
    this._dynamic.close({upload: false});
  }

  onCompare2(){
    if(this._description != undefined){
      
      this._description_length = this._description.length;

      if(this._description.length === 250){
        this._description_klass = 'text-danger mb-0'
      }
      else{
        this._description_klass = 'mb-0'
      }
    }
  }
}
