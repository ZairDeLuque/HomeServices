import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-homestep3',
  templateUrl: './homestep3.component.html',
  styleUrls: ['./homestep3.component.css']
})
export class Homestep3Component {
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
}
