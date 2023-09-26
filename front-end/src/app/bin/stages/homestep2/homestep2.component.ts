import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SaveFormsService } from '../../services/forms/storage/save-forms.service';
import { FormGroup } from '@angular/forms';

interface State {
  name: string;
  code: string;
}

@Component({
  selector: 'app-homestep2',
  templateUrl: './homestep2.component.html',
  styleUrls: ['./homestep2.component.css']
})
export class Homestep2Component implements OnInit{
  protected stateselected: string = "";

  private formSaved: FormGroup | null;
  
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
      label: 'Intereses'
    }
  ]
  protected states: State[] = [];

  constructor(private _saves: SaveFormsService){
    this.formSaved = null;
  }

  ngOnInit(): void {
    this._saves.getFormData().subscribe((packet) => {
      this.formSaved= packet;
    })
  }
}
