import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { map } from 'rxjs/operators'
import { isNullOrUndefined } from 'util';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class NologinGuard  {

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
        return true;
      }
      else{
        this.authService.isAuthenticated();
        this.route.navigate(['']);
        return false;
      }
      // console.log(auth)
    }))
  }
}
