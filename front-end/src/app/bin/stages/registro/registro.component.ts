import { Component } from '@angular/core';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  
  user = {
    correo: "",
    contra: "",
    nombre: "",
    apellido: "", 
    fechaNac: "", 
    nomUser: ""

  }

  registro(){
    if(this.user.correo !== "" && this.user.contra !== "" && this.user.nombre !== "" && this.user.apellido !== "" && this.user.fechaNac !== "" && this.user.nomUser !== ""){
      Notiflix.Loading.standard("Validando");
    } else {
      Notiflix.Notify.failure("datos vacios👻");
    }
  }


}
