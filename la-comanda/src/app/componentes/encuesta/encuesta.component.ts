import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { SnackbarService } from 'src/app/servicios/snackbar.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  encuestaForm = new FormGroup({
    primeraVez: new FormControl('', [Validators.required]),
    servicio: new FormControl('', [Validators.required]),
    comida: new FormControl('', [Validators.required]),
    mesa: new FormControl('', [Validators.required]),
    comentarios: new FormControl('')
  });
  usuario: any;

  constructor(
    private fireServ: FirebaseService,
    private auth: AuthService,
    private router: Router,
    public spinner: SpinnerService,
    public snackBar: SnackbarService) { }

  ngOnInit() {
    this.spinner.showLoadingSpinner();
    this.auth.getUserData().subscribe(res => {
      this.usuario = res;
      this.spinner.hideLoadingSpinner();
    });
  }

  encuesta() {
    this.spinner.showLoadingSpinner();
    this.fireServ.crear('encuestas', {
      cliente: this.usuario.uid,
      clienteNomnre: this.usuario.nombre,
      primeraVez: this.encuestaForm.value.primeraVez,
      servicio: this.encuestaForm.value.servicio,
      comida: this.encuestaForm.value.comida,
      mesa: this.encuestaForm.value.mesa,
      comentarios: this.encuestaForm.value.comentarios,
    }).then(() => {
      this.spinner.hideLoadingSpinner()
      this.router.navigate(['home-cliente']);
      this.snackBar.openSnackBar("Gracias por llenar la encuesta", 'Cerrar');
    })
  }

}
