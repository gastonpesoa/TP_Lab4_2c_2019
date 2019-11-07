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
  usrName = '';

  constructor(private authService: AuthService, private sidenavServ: SidenavService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;

    this.isLoggedIn$.subscribe(res => {
      if(res){
        this.setUsrName()
      }
    });
  }

  logOut() {
    this.authService.logOut();
  }

  setUsrName(){
    const usrData = this.authService.decodeToken();
    this.usrName = usrData.data.username;
  }

}
