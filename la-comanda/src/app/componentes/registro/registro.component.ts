import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/clases/user';
import { UserService } from 'src/app/servicios/user.service';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/servicios/upload.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment'
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { SnackbarService } from 'src/app/servicios/snackbar.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  selectedFile: File = null;
  siteKey: string = environment.recaptcha.siteKey;

  registroForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    avatar: new FormControl(''),
    recaptcha: new FormControl(null, [Validators.required])
  });
  base64file;

  constructor(
    private fireServ: FirebaseService,
    public spinner: SpinnerService,
    private authServ: AuthService,
    private router: Router,
    private uploadServ: UploadService,
    public snackBar: SnackbarService) { }

  ngOnInit() {
  }

  toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  onFileInput(event) {
    if (event.target.files.length > 0) {
      this.selectedFile = <File>event.target.files[0];
      this.toBase64(event.target.files[0]).then(res => {
        this.base64file = res
        this.registroForm.get('avatar').setValue(this.base64file);
      });
    }
  }

  registro() {
    this.spinner.showLoadingSpinner();
    this.authServ.register(this.registroForm.value.name, this.registroForm.value.email,
      this.registroForm.value.password, this.base64file)
      .then(auth => {
        this.spinner.hideLoadingSpinner();
        this.router.navigate(['']);
        this.snackBar.openSnackBar("Usuario registrado", '');
      })
      .catch(err => {
        console.info("error", err);
        this.spinner.hideLoadingSpinner();
        this.snackBar.openSnackBar(err.message, 'Error');
      })
  }
}
