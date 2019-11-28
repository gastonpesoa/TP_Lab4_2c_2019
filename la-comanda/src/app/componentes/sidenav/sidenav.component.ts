import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  opened: boolean = false;
  pages = [];

  constructor(private router: Router,
    private authService: AuthService) { }

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

  goTo(path: string) {
    this.router.navigate([path]);
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
            // {
            //   title: 'Alta de Usuario',
            //   url: '/alta-usuario',
            //   icon: 'add'
            // },
            {
              title: 'Lista de espera',
              url: '/lista-espera',
              icon: 'list'
            },
            {
              title: 'Pedir',
              url: '/home-cliente',
              icon: 'add'
            },
            {
              title: 'Lista de pedidos',
              url: '/lista-pedidos',
              icon: 'list'
            },
            {
              title: 'Lista de pedidos de cocina',
              url: '/lista-pedidos-cocina',
              icon: 'list'
            },
            {
              title: 'Lista de pedidos de barra',
              url: '/lista-pedidos-barra',
              icon: 'list'
            },
            {
              title: 'Encuesta',
              url: '/encuesta',
              icon: 'create'
            },
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
            },
            {
              title: 'Lista de pedidos',
              url: '/lista-pedidos',
              icon: 'list'
            }
          )
          break;
        case 'cocinero':
          this.pages.push(
            {
              title: 'Lista de pedidos de cocina',
              url: '/lista-pedidos-cocina',
              icon: 'list'
            },
          )
          break;
        case 'bartender':
          this.pages.push(
            {
              title: 'Lista de pedidos de barra',
              url: '/lista-pedidos-barra',
              icon: 'list'
            },
          )
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
