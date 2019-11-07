import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(private httpService: HttpService) { }

  list() {
    return this.httpService.getWithToken('mesa/');
  }
}
