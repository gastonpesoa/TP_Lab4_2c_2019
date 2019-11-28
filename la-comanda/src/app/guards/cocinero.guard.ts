import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CocineroGuard implements CanActivate {
  tipo: any;

  constructor(
    private authService: AuthService,
    private route: Router
  ) {
    this.authService.getUserData().subscribe(usrData => {
      this.tipo = usrData.tipo;
    })
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.tipo != 'cocinero') {
      this.route.navigate(['']);
      return false;
    }
    return true;
  }
}
