import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { interval } from 'rxjs';
import { ServersguardianService } from './bin/services/api/serversguardian.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'front-end';

  protected splash: boolean = false;
  protected splash_TITLE: string = '';
  protected splash_REASON: string = '';

  protected splash_TIMER: number = 30
  private TIMER_RESTART: boolean = false;
  private TIMER_ALREADY: boolean = false;

  protected animations: string = '';

  constructor(private router: Router, private Guardian: ServersguardianService) { }

  runTimer() {
    this.TIMER_ALREADY = true;

    const timer = setInterval(() => {
      if(document.hasFocus()){
        this.splash_TIMER--;
        if (this.splash_TIMER === 0) {
          if (this.TIMER_RESTART === true) {
            this.splash_TIMER = 30;
          } else {
            clearInterval(timer);
          }
        }
      }
    }, 1000);
  }

  runOnce(callback: () => void, delay: number) {
    let timer: string | number | NodeJS.Timeout | null | undefined;
  
    function reset() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    }
  
    reset();
    timer = setTimeout(() => {
      callback();
      reset();
    }, delay);
  }

  private guardianInit(){
    this.Guardian.isrunning().subscribe(
      result => {
        if(result.active === false){
          if(this.TIMER_RESTART === false){
            this.TIMER_RESTART = true;
          }

          if(this.TIMER_ALREADY === false){
            this.runTimer();
          }

          if(this.animations !== 'anim-in'){
            this.animations = 'anim-in'
          }

          this.splash = true;
          this.splash_TITLE = result.title;
          this.splash_REASON = result.reason; 
        }
        else{
          if(this.animations !== 'anim-out'){
            this.animations = 'anim-out'
          }

          if(this.TIMER_RESTART === true){
            this.TIMER_RESTART = false;
          }
          
          this.runOnce(() => {
            console.clear()

            this.splash_TIMER = 30;
            this.TIMER_ALREADY = false;
            this.splash = false;
          }, 1000)
        }
      },
      error => {
        if(this.animations !== 'anim-in'){
          this.animations = 'anim-in'
        }

        if(this.TIMER_RESTART === false){
          this.TIMER_RESTART = true;
        }

        if(this.TIMER_ALREADY === false){
            this.runTimer();
        }

        this.splash = true;
        this.splash_TITLE = 'Conexion perdida';
        this.splash_REASON = 'Hemos perdido la conexion con HomeServices®️ Web Services. Reintentaremos en breve.'
      }
    )
  }

  ngOnInit(): void {
    this.guardianInit()

    interval(30000).subscribe(()=> {
      if(document.hasFocus()){
        this.guardianInit();
      }
    })
    // this.router.navigate([""]);
  }
}
