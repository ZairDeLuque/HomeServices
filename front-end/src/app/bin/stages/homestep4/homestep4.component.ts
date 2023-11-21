import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import * as Notiflix from 'notiflix';
import { OnchangeService } from '../../services/pics/onchange.service';
import { UsersgestorService } from '../../services/api/usersgestor.service';
import { Router } from '@angular/router';

interface image {
  blob: any
}

@Component({
  selector: 'app-homestep4',
  templateUrl: './homestep4.component.html',
  styleUrls: ['./homestep4.component.css'],
  providers: [MessageService]
})
export class Homestep4Component implements OnInit{

  //Group
  protected formCurrentStage: FormGroup;
  
  protected genre: any = [
    {
      name: 'Masculino',
      code: 1
    },
    {
      name: 'Femenino',
      code: 2
    }
  ]

  protected exp: any[] = [
    {
      name: 'Nada (No he trabajado)',
      code: 1
    },
    {
      name: 'Casi nada (He trabajado menos de 6 meses o rara vez)',
      code: 2
    },
    {
      name: 'Intermedia (He trabajado entre 6 meses y 1 año)',
      code: 3
    },
    {
      name: 'Mucha (He trabajado entre 1 a 5 años)',
      code: 4
    },
    {
      name: 'Demasiada (He trabajado más de 5 años)',
      code: 5
    }
  ]

  protected times: any[] = [
    {
      name: 'Nada (Menos de 1 hora al día)',
      code: 1
    },
    {
      name: 'Casi nada (Menos de 3 horas al día)',
      code: 2
    },
    {
      name: 'Intermedia (Puedo estar entre 3 y 6 horas al día)',
      code: 3
    },
    {
      name: 'Mucha (Puedo estar entre 6 y 9 horas al día)',
      code: 4
    },
    {
      name: 'Demasiada (Puedo estar más de 9 horas al día)',
      code: 5
    }
  ]

  protected ages: any[] = [];
  protected months: any[] = [];

  protected _fileA: string | undefined;
  protected _fileA_length: number = 0;
  protected _fileA_all: any;
  private uploadPics: image[] = [];
  
  countFileSelected(event: any){
    this._fileA_length = event.currentFiles.length;
    this._fileA_all = event.currentFiles;
    // console.log(this._fileA_all);
  }
  
  deleteFileSelected(event: any){
    if(this._fileA_length > 0){
      this._fileA_length--;

      this._fileA_all = this._fileA_all.filter((item: any) => {
        return item.name !== event.file.name;
      });

      // console.log(this._fileA_all);
      
    }
    else{
      this._fileA_length = 0;
      this._fileA_all = [];
    }
  }

  constructor( private _builder: FormBuilder, private NG_MSG: MessageService, private title: Title, private _compiler: OnchangeService, private _users: UsersgestorService, private _router: Router) {
    this.formCurrentStage = this._builder.group({
      name: ['', [Validators.required]],
      age: [18, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.max(50), Validators.min(18)]],
      genre: ['', [Validators.required]],
      ybirth: ['', [Validators.required]],
      mbirth: ['', [Validators.required]],
      dbirth: [1, [Validators.required, Validators.max(31), Validators.min(1)]],
      crp: ['', [Validators.required, Validators.maxLength(18)]],
      rc: ['', [Validators.required, Validators.maxLength(13)]],
      hsA: ['', [Validators.required]],
      hsB: ['', [Validators.required]],
      hsC: ['', [Validators.required]],
      required: ['', [Validators.required]]
    })

    for(let i = 0; i < 54; i++){
      const age = 2023;
      this.ages.push(
        {
          name: age - i,
          code: age - i
        }
      );
    }

    for(let i = 0; i < 12; i++){
      const month = 1;

      const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

      this.months.push(
        {
          name: months[i],
          code: month + i
        }
      );
    }

    this.title.setTitle('Formulario de registro | HomeServices®️')
  }

  async uploadImages() {
    if(this._fileA_length > 2){
      this.NG_MSG.add({severity: 'error', summary: 'Error', detail: 'Solo puedes subir 2 imágenes, es tu identificación.'});
      return;
    }
    else if(this._fileA_length === 1){
      this.NG_MSG.add({severity: 'error', summary: 'Error', detail: 'Aun falta subir una cara de tu identificación personal.'});
      return;
    }
    else if(this._fileA_length === 0){
      this.NG_MSG.add({severity: 'error', summary: 'Error', detail: 'Debes subir 2 imágenes de tu identificación personal.'});
      return;
    }

    for (let a = 0; a < this._fileA_length; a++) {
      try {
        const file = this._fileA_all[a];
        const data = await this._compiler.extractorSrc(file);
        const information = data.code;
        const data2 = await this._compiler.recompileSrc(information, 500, 300);
  
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

  async onSubmit(){
    await this.uploadImages();
    
    if(this.uploadPics.length === 2){
      Notiflix.Loading.dots('Compilando imágenes y subiendo formulario...',{
        clickToClose: false,
        svgColor: '#a95eff',
        className: 'font-b',
        backgroundColor: '#fff',
        messageColor: '#000'
      })
  
      const packet = {
        n0x: this.formCurrentStage.value.name,
        a0x: this.formCurrentStage.value.age,
        g0x: this.formCurrentStage.value.genre[0].code,
        d0x: this.formCurrentStage.value.dbirth + '/' + this.formCurrentStage.value.mbirth[0].code + '/' + this.formCurrentStage.value.ybirth[0].code,
        c0x: this.formCurrentStage.value.crp,
        r0x: this.formCurrentStage.value.rc,
        h0x: this.formCurrentStage.value.hsA, 
        h1x: this.formCurrentStage.value.hsB[0].code,
        h2x: this.formCurrentStage.value.hsC[0].code,
        _u0x: this.whatUUID()
      }
  
      this._users.createCredentials_Sellers(packet).subscribe((data: any) => {
        if(data.saved === true){
          const packet = {
            blobId: data.blobId,
            a0x: this.uploadPics[0].blob,
            b0x: this.uploadPics[1].blob,
          }
  
          this._users.createCredentials_Sellers_Pics(packet).subscribe((data2: any) => {
            if(data2.saved === true){
              Notiflix.Loading.remove();
              Notiflix.Notify.success(data2.result);
              this._router.navigateByUrl('/')
            }
          }, (error2: any) => {
            Notiflix.Loading.remove();
            console.error(error2)
            this.NG_MSG.add({severity: 'error', summary: 'Error', detail: 'Nuestra misión para crear una solicitud de registro ha fallado, intenta más tarde.'});
          });
        }
        else{
          this.NG_MSG.add({severity: 'error', summary: 'Error', detail: 'Nuestra misión para crear una solicitud de registro ha fallado, intenta más tarde.'});
        }
      }, (error: any) => {
        console.error(error);
        this.NG_MSG.add({severity: 'error', summary: 'Error', detail: 'Nuestra misión para crear una solicitud de registro ha fallado, intenta más tarde.'});
      });
    }
  }

  ngOnInit(): void {
    const packet = {
      _u0x: this.whatUUID()
    }

    this._users.isAlreadyRequested(packet).subscribe((data: any) => {
      if(data.result === true){
        Notiflix.Notify.warning('Ya has solicitado un registro, no puedes volver a hacerlo. Espera respuesta de tu solicitud.');
        Notiflix.Loading.remove();

        this._router.navigateByUrl('/');
      }
      else{
        Notiflix.Loading.remove();
      }
    }, (error: any) => {
      console.error(error);
      
      Notiflix.Notify.failure('Error al verificar si ya has solicitado un registro.');
      Notiflix.Loading.remove();

      this._router.navigateByUrl('/');
    });
  }
}
