/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SaveFormsService } from '../../services/forms/storage/save-forms.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  protected formCurrentStage: FormGroup;

  protected steps: MenuItem[] = [
    //Temp Line
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

  protected states: State[] = [];

  constructor(private _saves: SaveFormsService, private __formBuilder: FormBuilder){
    this.formSaved = null;

    //Form
    this.formCurrentStage = this.__formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
      lastnames: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
      cp: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(5), Validators.maxLength(5)]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      age: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this._saves.getFormData().subscribe((packet) => {
      this.formSaved = packet || null;
    })
  }
  
  onSave(){
    
  }
}
