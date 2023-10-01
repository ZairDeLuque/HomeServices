/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatesandcitysService } from '../../services/forms/data/statesandcitys.service';
import { Location } from '@angular/common';
import { SaveFormsService } from '../../services/forms/storage/save-forms.service';
import { Router } from '@angular/router';

interface State {
  name: string;
  code: string;
}

interface Citys {
  name: string;
  stateCode: string;
}

interface genres {
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

  protected states: State[];
  
  protected citys: Citys[] = [];

  protected genre: genres[] = [
    {name: 'Hombre', code: 'H'},
    {name: 'Mujer', code: 'M'},
    {name: 'Prefiero no decirlo', code: 'P'},
    {name: 'Otro', code: 'O'}
  ]

  constructor(private router: Router, private _save: SaveFormsService, private __formBuilder: FormBuilder, private _sandc: StatesandcitysService, private _location: Location){
    //Form
    this.formCurrentStage = this.__formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
      lastnames: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
      cp: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(5), Validators.maxLength(5)]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      age: ['', [Validators.required]],
      ageVerify: ['', [Validators.required]]
    })

    this.states = _sandc.getStates();
  }

  updateCitys(){
    try{
      const selectedCode = this.formCurrentStage.controls['state'].value[0].code;

      this.citys = this._sandc.getCitysWithoutState(selectedCode)
    }
    catch{
      this.citys = []
    }
  }

  ngOnInit(): void {
    
  }

  returnPos(): void{
    this._location.back();
  }
  
  onSave(){
    if(!this.formCurrentStage.errors){
      this._save.setFormInfo(this.formCurrentStage)

      this.router.navigate(['/start/verification'])
    }
  }
}
