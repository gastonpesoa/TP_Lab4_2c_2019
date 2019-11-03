import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { SidenavService } from 'src/app/servicios/sidenav.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private sidenavServ: SidenavService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  logOut() {
    this.authService.logOut();
  }

}
