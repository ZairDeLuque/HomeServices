import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SaveFormsService } from '../../services/forms/storage/save-forms.service';

@Component({
  selector: 'app-homestep3',
  templateUrl: './homestep3.component.html',
  styleUrls: ['./homestep3.component.css']
})
export class Homestep3Component implements OnInit{
  private formSaved: any;
  protected mail: string = '';

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

  constructor(private _save: SaveFormsService){
    this.formSaved = null;
  }

  ngOnInit(): void {
    this._save.getFormData().subscribe((packet) => {
      this.formSaved = packet;
    })

    this.mail = this.formSaved.controls['email'].value
  }
}
