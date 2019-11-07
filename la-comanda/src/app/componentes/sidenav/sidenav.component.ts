import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  opened: boolean = false;
  pages = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isLoggedIn$.subscribe(res => {
      if(res){
        this.getMenu()
      }
    });
  }

  logOut() {
    this.authService.logOut();
  }

  getMenu() {
    const usrData = this.authService.decodeToken();
    this.pages = [];
    this.pages.push(
      {
        title: 'Home',
        url: '',
        icon: 'home'
      }
    )
    switch (usrData.data.tipo) {
      case 'admin':
        this.pages.push(
          {
            title: 'Alta de Usuario',
            url: '/alta-usuario',
            icon: 'add'
          }
        )
        break;
      case 'socio':
        this.pages.push(
          {
            title: 'Alta de Usuario',
            url: '/alta-usuario',
            icon: 'add'
          }
        )
        break;
      case 'mozo':

        break;
      case 'cocinero':

        break;
      case 'bartender':

        break;
      case 'cervecero':

        break;
      case 'usuario':

        break;

      default:
        break;
    }
  }

}
