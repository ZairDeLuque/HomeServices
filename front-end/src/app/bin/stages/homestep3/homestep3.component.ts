import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-homestep3',
  templateUrl: './homestep3.component.html',
  styleUrls: ['./homestep3.component.css'],
  providers: [MessageService]
})
export class Homestep3Component implements OnInit{
  data: any;
  options: any;

  constructor(private NG_MSG: MessageService, private title: Title){}

  ngOnInit(): void{

    this.title.setTitle('Portal para vendedores | HomeServices®')

    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
        labels: ['Enero 20', 'Abril 20', 'Mayo 20', 'Marzo 21', 'Abril 21', 'Diciembre 21', 'Oct 22'],
        datasets: [
            {
                label: 'Empleo Informal',
                data: [30.6, 20.7, 24.6, 30.6, 31.0, 32.2, 32.4],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                tension: 0
            },
            {
                label: 'Empleo Formal',
                data: [24.0, 23.0, 21.0, 22.4, 24.4, 24.8, 26.1],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--pink-500'),
                tension: 0
            }
        ]
    };

    this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.9,
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
  }
}
