import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  protected UUIDactive: string;
  
  constructor(private title: Title, private ar: ActivatedRoute) {
    this.UUIDactive = this.ar.snapshot.params['uuid']
  }

  ngOnInit(): void {
    this.title.setTitle('WorkHome®️ - [Nombre]')
  }
}
