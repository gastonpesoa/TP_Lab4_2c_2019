import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MozoGuard implements CanActivate {
  tipo: any;

  constructor(
    private authService: AuthService,
    private route: Router
  ) {
    this.authService.getUserData().subscribe(usrData => {
      this.tipo = usrData.tipo;
      console.info("mozo guard ctor", this.tipo)
    })
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.info("mozo guard canactive", this.tipo)
    if (this.tipo != 'mozo') {
      this.route.navigate(['']);
      return false;
    }
    return true;
  }
}
