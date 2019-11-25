import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { Pedido } from 'src/app/clases/pedido';

export interface Menu {
  id: number;
  nombre: string;
  precio: number;
  sector: string;
}

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  idUser;
  nombreUser;
  mesa;
  menus = [];
  displayedColumns: string[] = ['nombre', 'precio', 'sector', 'select'];
  dataSource: Menu[] = [];

  pedidoForm = new FormGroup({
    idMenu: new FormControl('', [Validators.required]),
    codigoMesa: new FormControl(''),
    nombreCliente: new FormControl(''),
    nombreMenu: new FormControl(''),
  });

  constructor(
    public router: Router,
    private pedidoServ: PedidoService,
    private authServ: AuthService,
    public spinner: SpinnerService, ) { }

  ngOnInit() {
    this.mesa = window.history.state.data;
    console.info("mesa", this.mesa);
    this.getMenus();
    this.getUsrName();
    // let controlCodigoMesa = this.pedidoForm.get('codigoMesa')
    // controlCodigoMesa.disabled ? controlCodigoMesa.enable() : controlCodigoMesa.disable();
    // let controlCliente = this.pedidoForm.get('nombreCliente')
    // controlCliente.disabled ? controlCliente.enable() : controlCliente.disable();
  }

  getMenus() {
    this.pedidoServ.list().subscribe(res => {
      console.info("menus", res);
      this.dataSource = res;
    })
  }

  pedir() {
    this.spinner.showLoadingSpinner();
    const pedido = new Pedido();
    this.pedidoForm.controls['nombreCliente'].setValue(this.nombreUser);
    this.pedidoForm.controls['codigoMesa'].setValue(this.mesa.codigo);
    pedido.idMenu = this.pedidoForm.value.idMenu;
    pedido.codigoMesa = this.pedidoForm.value.codigoMesa;
    pedido.nombreCliente = this.nombreUser;
    console.info("pedido", pedido);
    console.info("pedido form", this.pedidoForm.value);
    this.pedidoServ.register(pedido).subscribe(
      (res) => {
        console.info("res", res);
        this.spinner.hideLoadingSpinner();
      },
      (error) => {
        console.error(error);
        this.spinner.hideLoadingSpinner();
      }
    )
  }

  getUsrName() {
    const usrData = this.authServ.decodeToken();
    this.nombreUser = usrData.data.username;
    this.idUser = usrData.data.id;
  }

  getErrorMessage() {
    return this.pedidoForm.hasError('required') ? 'Debe ingresar un valor' : '';
  }

  setIdMenu(menu) {
    console.info("menu", menu);
    this.pedidoForm.controls['idMenu'].setValue(menu.id);
    this.pedidoForm.controls['nombreMenu'].setValue(menu.nombre);
  }
}

