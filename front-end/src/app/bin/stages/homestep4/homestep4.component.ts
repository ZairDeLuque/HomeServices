import { Component, OnInit, TemplateRef } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Notify } from 'notiflix';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-homestep4',
  templateUrl: './homestep4.component.html',
  styleUrls: ['./homestep4.component.css'],
  providers: [MessageService]
})
export class Homestep4Component implements OnInit{

  //Blocked?
  protected aBlock: string = 'n';
  protected bBlock: string = 'n';
  
  //Avatar
  protected image: string = '';

  //Uses
  protected uses: any[] = [
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
  
  //Group
  protected formCurrentStage: FormGroup;

  constructor(private modalService: BsModalService, private _builder: FormBuilder, private NG_MSG: MessageService) {
    this.formCurrentStage = this._builder.group({
      file: ['', [Validators.required]]
    })
  }

  //Modal
  modalRef?: BsModalRef;

  openModal(template: TemplateRef<any>) {
    if(this.aBlock === 'n'){
      this.modalRef = this.modalService.show(template, {id: 1, class: 'bg-blur modal-lg mt-4 rounded-0', ignoreBackdropClick: true, keyboard: false});
    }
    else{
      this.NG_MSG.add({severity:'info', summary:'Espera...', detail:'Paso bloqueado, ha sido completado o saltado.'});
    }
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
      this.NG_MSG.add({severity:'error', summary:'Oh oh', detail:'No es posible usar la vista previa.'});
      return;
    }
  }

  jumpStep1(){
    this.closeModal();
    this.aBlock = 's';
  }
}
