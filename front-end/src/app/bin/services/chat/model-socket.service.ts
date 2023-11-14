import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModelSocketService {

  private api_URL = environment.Homework.apiUrl;

  io = io(this.api_URL,{
    autoConnect: false,
    timeout: 5000
  })

  constructor() { }
}
