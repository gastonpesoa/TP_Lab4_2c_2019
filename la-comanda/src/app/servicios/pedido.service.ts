import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Pedido } from '../clases/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private httpService: HttpService) { }

  list() {
    return this.httpService.getWithToken('menu/');
  }

  register(pedido: Pedido){
    return this.httpService.post('pedido/new', pedido);
  }
}
