import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/clases/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/servicios/user.service';
import { Router, Event } from '@angular/router';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { SnackbarService } from 'src/app/servicios/snackbar.service';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuariosLogin: Array<any> = [
    { id: 0, nombre: "admin", clave: "admin123", email: "admin@admin.com" },
    { id: 1, nombre: "socio", clave: "socio123", email: "socio@socio.com" },
    { id: 2, nombre: "cocinero", clave: "cocinero123", email: "cocinero@cocinero.com" },
    { id: 3, nombre: "mozo", clave: "mozo123", email: "mozo@mozo.com" },
    { id: 4, nombre: "bartender", clave: "bartender123", email: "bartender@bartender.com" },
    { id: 5, nombre: "cervecero", clave: "cervecero123", email: "cervecero@cervecero.com" },
    { id: 6, nombre: "cliente", clave: "cliente123", email: "cliente@cliente.com" },
    { id: 7, nombre: "clienteDos", clave: "cliente123", email: "clienteDos@clienteDos.com" },
    { id: 8, nombre: "clienteTres", clave: "cliente123", email: "clienteTres@clienteTres.com" },
  ]
  email: string;
  clave: string;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    public spinner: SpinnerService,
    public snackBar: SnackbarService) { }

  login() {
    this.spinner.showLoadingSpinner();
    this.auth.login(this.loginForm.value.email, this.loginForm.value.password)
      .then(res => {
        this.spinner.hideLoadingSpinner()
        this.router.navigate(['']);
      })
      .catch(err => {
        this.spinner.hideLoadingSpinner()
        this.snackBar.openSnackBar("Usuario o contraseña incorrectos", '');
      });
  }

  onChange(id) {
    this.email = this.usuariosLogin[id].email;
    this.clave = this.usuariosLogin[id].clave;
    this.loginForm.value.email = this.usuariosLogin[id].email;
    this.loginForm.value.clave = this.usuariosLogin[id].clave;
  }

  ngOnInit() {
  }

}
