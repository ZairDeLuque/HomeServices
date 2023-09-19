import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-homestep4',
  templateUrl: './homestep4.component.html',
  styleUrls: ['./homestep4.component.css']
})
export class Homestep4Component {
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
