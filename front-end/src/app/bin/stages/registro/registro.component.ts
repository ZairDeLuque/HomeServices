import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  
  usuario = {
    correo: "",
    pass: "",
    user: ""
  }
  
  constructor(private auth: AuthService, private router: Router ){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  registro(){
    if(this.usuario.correo !== "" && this.usuario.pass !== "" && this.usuario.user){
      Notiflix.Loading.standard("Validando");
        this.auth.registro(this.usuario).subscribe((res: any) => {
          if (res.Aceptado == "Datos Aceptados") {
            Notiflix.Loading.remove();
            Notiflix.Notify.info("Registro de datos en verificación");
            this.router.navigate(['login']);
          } else if (res.Error == "Los Datos No Fueron Aceptados") {
            Notiflix.Loading.remove();
            Notiflix.Notify.failure(res.Error);
          }
          }); 
          
            
    } else {
      Notiflix.Notify.failure("Por favor llene todos los campos");
    }
  }
}
