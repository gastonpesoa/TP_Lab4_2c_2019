import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpService: HttpService) { }

  upload(data){
    return this.httpService.upload('uploadFotoPerfil', data);
  }
}
