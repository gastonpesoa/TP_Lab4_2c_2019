import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/clases/user';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-alta-user',
  templateUrl: './alta-user.component.html',
  styleUrls: ['./alta-user.component.css']
})
export class AltaUserComponent implements OnInit {

  private user: User;
  altaForm = new FormGroup({
    nombre: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  alta() {
    // console.warn(this.altaForm.value);
    // const user = new User();
    // user.username = this.altaForm.value.username;
    // user.nombre = this.altaForm.value.nombre;
    // user.password = this.altaForm.value.password;
    // user.perfil = 'socio';
    // this.userService.register(user).subscribe(res => {
    //   console.info("res", res);
    // })
  }

}
