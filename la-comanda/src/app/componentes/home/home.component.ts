import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/clases/user';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/servicios/user.service';
import { MesaService } from 'src/app/servicios/mesa.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/servicios/snackbar.service';
import { AngularFirestore } from '@angular/fire/firestore';


export interface Mesa {
  codigo: string;
  esatdo: number;
  foto: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mesas: any[] = [];

  constructor(
    private mesaServ: MesaService,
    private router: Router,
    public snackBar: SnackbarService) { }

  ngOnInit() {
    return this.mesaServ.getMesas().subscribe(res => {
      console.info('mesas', res);
      this.mesas = res
    })
  }



}
