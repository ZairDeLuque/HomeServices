import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SignupHashesService } from '../../services/session/cache/signup-hashes.service';
import { VerifyCodeService } from '../../services/api/verify-code.service';
import * as Notiflix from 'notiflix';
import { SaveFormsService } from '../../services/forms/storage/save-forms.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-homestep3',
  templateUrl: './homestep3.component.html',
  styleUrls: ['./homestep3.component.css'],
  providers: [MessageService]
})
export class Homestep3Component implements OnInit{
  private formSaved: any;
  protected mail: string = '';
  private hash: string = '';

  protected iserrorsend: boolean = false;

  protected codeVerify: number = 0;
  protected codeInput: number = 0;
  protected activeBtn: boolean = false;

  constructor(private _HASH: SignupHashesService, private verifyService: VerifyCodeService, private locate: Location, private _save: SaveFormsService){}

  reformatJSON(): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      try{
        const JSONSimplify = {
          h0x: this.hash,
          e1x: this.mail
        }
  
        resolve(JSONSimplify)
      }
      catch{
        reject('Not formated')
      }
    })
  }
  
  back(){
    this.locate.back();
  }

  compare(){
    if(this.codeInput === this.codeVerify){
      this.activeBtn = true;
    }
    else{
      this.activeBtn = false;
    }
  }

  goMail(){
    window.location.href = 'https://gmail.com'
  }

  async ngOnInit(){
    Notiflix.Loading.dots('Enviando correo de verificacion...', {
      clickToClose: false,
      svgColor: '#a95eff',
      className: 'font-b'
    })

    this._HASH.getEmailHash().subscribe((res) => {
      this.hash = res;
    });

    this._save.getFormData().subscribe((packet) => {
      this.formSaved = packet;
    })

    this.mail = this.formSaved.controls['email'].value

    const json = await this.reformatJSON();

    this.verifyService.sendNewVerificationCode(json).subscribe(
      result => {
        if(result.saved === true){
          const codeAsNumber = parseInt(result.code, 10);
          this.codeVerify = codeAsNumber;
          
          Notiflix.Loading.remove();
        }
        else{
          this.iserrorsend = true;
          Notiflix.Loading.remove();
          Notiflix.Report.failure('Error al enviar correo.', `El agente encargado a fallado en enviar el correo de verificación a ${this.mail}. Posiblemente no tienes conexión a internet o compruebe el estado del servidor en www.home-status.store`, 'Cerrar')  
        }
      },
      error => {
        this.iserrorsend = true;
        Notiflix.Loading.remove();
        Notiflix.Report.failure('Error al enviar correo.', `El agente encargado a fallado en enviar el correo de verificación a ${this.mail}. Posiblemente no tienes conexión a internet o compruebe el estado del servidor en www.home-status.store`, 'Cerrar')
      }
    )
  }
}
