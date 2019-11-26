import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators'
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private Afauth: AngularFireAuth,
    private authService: AuthService,
    private route: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.Afauth.authState.pipe(map(auth => {
      if (isNullOrUndefined(auth)) {
        this.route.navigate(['/login']);
        return false;
      }
      else {
        this.authService.isAuthenticated();
        return true;
      }
    }))

  }

}
