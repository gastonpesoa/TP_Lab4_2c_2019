import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { User } from '../clases/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }

  login(nombre: string, pass: string) {
    return this.httpService.login('login', nombre, pass);
  }

  register(user: User){
    return this.httpService.post('registro', user);
  }
}
