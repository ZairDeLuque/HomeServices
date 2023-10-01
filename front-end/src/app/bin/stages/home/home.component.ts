import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Notify } from 'notiflix';
import { SaveFormsService } from '../../services/forms/storage/save-forms.service';
import { TinyService } from '../../services/navbars/customization/tiny.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  protected items: MenuItem[];
  protected value: string = "";

  //Form
  protected formLogin: FormGroup;

  constructor(private router: Router, private __formgroup: FormBuilder, private _save: SaveFormsService, private customNav: TinyService, private modalService: BsModalService, private _locate: Location) {    
    //PrimeNG Context Menu
    this.items = [
      {
        label: 'Copiar',
        icon: 'bi bi-file-earmark',
      },
      {
        label: 'Pegar',
        icon: 'bi bi-clipboard',
      },
      {
          separator: true
      },
      {
          label: 'Términos y condiciones',
          icon: 'bi bi-exclamation-circle',
          routerLink: '/terms'
      }
    ];

    //Form
    this.formLogin = this.__formgroup.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/[a-zA-Z0-9!@#$%^&*()-_+=<>?]/)]],
      checked: ['', [Validators.required]]
    })
  }
  
  //Modal
  modalRef?: BsModalRef | null;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {id: 1, class: 'bg-blur'});
  }

  closeModal() {
    if (!this.modalRef) {
      return;
    }
 
    this.modalRef.hide();
    this.modalRef = null;
  }

  siAccount(): void{
    this.router.navigate(["/login"]);
  }

  onResolved(captchaResponse: string) {
    if(captchaResponse){
      if(!this.formLogin.errors){        
        this.customNav.setChangeValue(this.formLogin.controls['email'].value)
        this.customNav.emitNewChange();
        
        this._save.setFormData(this.formLogin);
        
        // sessionStorage.setItem('s1x0', 'true');
        
        this.closeModal();
        
        this.router.navigate(["/start/verification"]);
      }
    }
  }

  back(){
    this._locate.back();
  }

  onErrorRecap(){
    Notify.failure('Verificación por ReCaptcha fuera de linea.');
  }

  ngOnInit(): void {
      
  }
}
