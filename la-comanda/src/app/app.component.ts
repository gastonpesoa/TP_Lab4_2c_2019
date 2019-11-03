import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './servicios/spinner.service';
import { AuthService } from './servicios/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'la-comanda';
  opened: boolean = false;
  isLoggedOut$: Observable<boolean>;

  constructor(public spinnerServ: SpinnerService, private authService: AuthService) { }

  ngOnInit(){
    this.isLoggedOut$ = this.authService.isLoggedOut;
  }

}
