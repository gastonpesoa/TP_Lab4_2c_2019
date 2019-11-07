import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/clases/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/servicios/user.service';
import { Router, Event } from '@angular/router';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { SnackbarService } from 'src/app/servicios/snackbar.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuariosLogin: Array<any> = [
    { id: 0, nombre: "admin", clave: "admin123" },
    { id: 1, nombre: "socio", clave: "socio" },
    { id: 2, nombre: "mozo", clave: "mozo" },
    { id: 3, nombre: "bartender", clave: "bartender" },
    { id: 4, nombre: "cervecero", clave: "cervecero" },
    { id: 5, nombre: "cocinero", clave: "cocinero" },
    { id: 6, nombre: "cliente", clave: "cliente" }
  ]
  nombre: string;
  clave: string;

  loginForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
    public spinner: SpinnerService,
    public snackBar: SnackbarService) { }

  login() {
    this.spinner.showLoadingSpinner();
    this.userService.login(this.loginForm.value.name, this.loginForm.value.password)
      .subscribe(res => {
        console.info("res: ", res);
        if (res.Estado == "OK") {
          localStorage.setItem("token", res.Token); // Store token
          this.spinner.hideLoadingSpinner()
          this.router.navigate(['']);
        } else {
          this.spinner.hideLoadingSpinner()
          this.snackBar.openSnackBar("Usuario o contraseña incorrectos",'');
        }
      });
  }

  getErrorMessage() {
    return this.loginForm.hasError('required') ? 'Debe ingresar un valor' : '';
  }

  onChange(id) {
    this.nombre = this.usuariosLogin[id].nombre;
    this.clave = this.usuariosLogin[id].clave;
    this.loginForm.value.name = this.usuariosLogin[id].nombre;
    this.loginForm.value.password = this.usuariosLogin[id].clave;
  }

  ngOnInit() {
  }

}
