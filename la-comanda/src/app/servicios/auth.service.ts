import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private loggedOut = new BehaviorSubject<boolean>(true);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isLoggedOut() {
    return this.loggedOut.asObservable();
  }

  constructor(public jwtHelper: JwtHelperService, private router: Router) {
  }

  public isAuthenticated(): boolean {
    var result: boolean = false;
    const token = localStorage.getItem('token');
    if (!this.jwtHelper.isTokenExpired(token)) {
      result = true;
      this.loggedIn.next(true);
      this.loggedOut.next(false);
    }
    return result;
  }

  public decodeToken() {
    return this.jwtHelper.decodeToken(localStorage.getItem('token'));
  }

  public logOut() {
    if (localStorage.getItem('token')) {
      this.loggedIn.next(false);
      this.loggedOut.next(true);
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }

}
