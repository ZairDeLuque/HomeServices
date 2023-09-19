import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'front-end';
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(["/article/0-0"]);
  }
}
