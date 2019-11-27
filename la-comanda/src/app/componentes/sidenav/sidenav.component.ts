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
      if (res) {
        this.getMenu()
      }
    });
  }

  logOut() {
    this.authService.logOut();
  }

  getMenu() {
    this.pages = [];
    this.pages.push(
      {
        title: 'Home',
        url: '',
        icon: 'home'
      }
    )
    this.authService.getUserData().subscribe(usrData => {
      switch (usrData.tipo) {
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
          this.pages.push(
            {
              title: 'Lista de espera',
              url: '/lista-espera',
              icon: 'list'
            }
          )
          break;
        case 'cocinero':

          break;
        case 'bartender':

          break;
        case 'cervecero':

          break;
        case 'cliente':
          this.pages.push(
            {
              title: 'Pedir',
              url: '/home-cliente',
              icon: 'add'
            }
          )
          break;

        default:
          break;
      }

    });
  }

}
