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

  register(user: User) {
    return this.httpService.post('registro', user);
  }

  getTest() {
    return this.httpService.get('pedido/listarPedidosPorMesa/mes02');
  }

  postTest() {
    let mesa = {codigo:"mes06"}
    return this.httpService.post('mesa/new', mesa);
  }

  postTestTest() {
    return this.httpService.postTest('mesa/test');
  }
}
