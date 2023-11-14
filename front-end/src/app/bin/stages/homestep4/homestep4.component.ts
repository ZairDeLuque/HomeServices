import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

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

  constructor( private _builder: FormBuilder, private NG_MSG: MessageService, private title: Title) {
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

  ngOnInit(): void {
  }
}
