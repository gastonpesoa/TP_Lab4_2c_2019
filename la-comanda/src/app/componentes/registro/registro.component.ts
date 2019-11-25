import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/clases/user';
import { UserService } from 'src/app/servicios/user.service';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/servicios/upload.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment'
import { SpinnerService } from 'src/app/servicios/spinner.service';

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
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    avatar: new FormControl(''),
    recaptcha: new FormControl(null, [Validators.required])
  });

  constructor(
    public spinner: SpinnerService,
    private userServ: UserService,
    private router: Router,
    private uploadServ: UploadService,
    public jwtHelper: JwtHelperService) { }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.registroForm.hasError('required') ? 'Debe ingresar un valor' : '';
  }

  onFileInput(event) {
    if (event.target.files.length > 0) {
      this.selectedFile = <File>event.target.files[0];
      console.info("file", this.selectedFile);
      this.registroForm.get('avatar').setValue(this.selectedFile);
    }
  }

  registro() {
    this.spinner.showLoadingSpinner();
    const formData = new FormData();
    formData.append('imagen', this.selectedFile, this.selectedFile.name);

    const user = new User();
    user.username = this.registroForm.value.username;
    user.nombre = this.registroForm.value.name;
    user.password = this.registroForm.value.password;

    this.userServ.register(user).subscribe(
      (res) => {
        console.info("res", res);
        var payload = this.jwtHelper.decodeToken(res.Token);
        var userId = payload.data.id;
        localStorage.setItem("token", res.Token);
        formData.append('id', userId);

        this.uploadServ.upload(formData).subscribe(
          (res) => {
            console.info("res", res);
            this.spinner.hideLoadingSpinner();
            this.router.navigate(['']);
          },
          (error) => {
            console.error(error);
            this.spinner.hideLoadingSpinner();
          });
      },
      (error) => {
        console.error(error);
        this.spinner.hideLoadingSpinner();
      });
  }
}
