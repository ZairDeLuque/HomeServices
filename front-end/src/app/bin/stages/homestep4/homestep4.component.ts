import { Component, TemplateRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Notify } from 'notiflix';

@Component({
  selector: 'app-homestep4',
  templateUrl: './homestep4.component.html',
  styleUrls: ['./homestep4.component.css']
})
export class Homestep4Component {

  //Blocked?
  protected aBlock: boolean = false;
  protected bBlock: boolean = false;
  protected cBlock: boolean = false;
  protected dBlock: boolean = false;

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

  constructor(private modalService: BsModalService) {

  }

  //Modal
  modalRef?: BsModalRef;
  modalRef2?: BsModalRef;
  modalRef3?: BsModalRef;
  modalRef4?: BsModalRef;
  openModal(template: TemplateRef<any>) {
    if(this.aBlock === false){
      this.modalRef = this.modalService.show(template, {id: 1, class: 'bg-blur modal-xl', ignoreBackdropClick: true});
    }
    else{
      Notify.info('Paso bloqueado, ha sido completado.')
    }
  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, {id: 2, class: 'modal-xl bg-blur'});
  }
  openModal3(template: TemplateRef<any>) {
    this.modalRef3 = this.modalService.show(template, {id: 3, class: 'bg-blur'});
  }
  openModal4(template: TemplateRef<any>) {
    this.modalRef4 = this.modalService.show(template, {id: 4, class: 'bg-blur'});
  }

  closeModal(modalId?: number){
    this.modalService.hide(modalId);
  }
}
