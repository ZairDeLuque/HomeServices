import { Component, OnInit, TemplateRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Notify } from 'notiflix';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-homestep4',
  templateUrl: './homestep4.component.html',
  styleUrls: ['./homestep4.component.css']
})
export class Homestep4Component implements OnInit{

  //Blocked?
  protected aBlock: string = 'n';
  protected bBlock: string = 'n';
  protected cBlock: string = 'n';
  protected dBlock: string = 'n';

  //Avatar
  protected image: string = '';

  //Group
  protected formCurrentStage: FormGroup;

  //Select
  protected stateselected: string = "";
  protected states: any[] = [
    {
      name: 'Vender'
    },
    {
      name: 'Comprar'
    },
    {
      name: 'Aun no lo decido'
    }
  ];

  protected steps: MenuItem[] = [
    {
      label: 'Credenciales'
    },
    {
      label: 'Información personal'
    },
    {
      label: 'Verificación'
    },
    {
      label: 'Personalización'
    }
  ]

  constructor(private modalService: BsModalService, private _builder: FormBuilder, private sanitizer: DomSanitizer) {
    this.formCurrentStage = this._builder.group({
      file: ['', [Validators.required]]
    })
  }

  //Modal
  modalRef?: BsModalRef;
  modalRef2?: BsModalRef;

  openModal(template: TemplateRef<any>) {
    if(this.aBlock === 'n'){
      this.modalRef = this.modalService.show(template, {id: 1, class: 'bg-blur modal-xl mt-4 rounded-0', ignoreBackdropClick: true});
    }
    else{
      Notify.info('Paso bloqueado, ha sido completado.')
    }
  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, {id: 2, class: 'modal-xl bg-blur'});
  }

  closeModal(modalId?: number){
    this.modalService.hide(modalId);
  }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    try{
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
    catch (err){
      Notify.failure('No es posible usar la vista previa.')
      console.error(err)
    }
  }

  jumpStep1(){
    this.aBlock = 's';
    this.closeModal(1);
  }
}
