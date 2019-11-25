import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/clases/user';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/servicios/user.service';
import { MesaService } from 'src/app/servicios/mesa.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/servicios/snackbar.service';
import { BarcodeService } from 'src/app/servicios/barcode.service';

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

  mesas: Mesa[] = [];

  constructor(
    private mesaServ: MesaService, 
    private router: Router, 
    public snackBar: SnackbarService) { }

  ngOnInit() {
    this.mesaServ.list().subscribe(res => {
      console.info("mesas", res)
      this.mesas = res;
    })
  }

  tomarMesa(mesa) {
    if (mesa.estado == 'cerrada') {
      this.router.navigate(['/pedido'], {
        state: { data: mesa }
      });
    } else {
      this.snackBar.openSnackBar("Seleccione una mesa disponible", "")
    }

  }

}
