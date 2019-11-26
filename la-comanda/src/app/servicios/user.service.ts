import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { User } from '../clases/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }

}
