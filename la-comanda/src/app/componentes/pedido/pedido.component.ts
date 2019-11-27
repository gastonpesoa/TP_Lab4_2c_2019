import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { Pedido } from 'src/app/clases/pedido';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { map } from 'rxjs/operators'

export interface Menu {
  id: number;
  nombre: string;
  precio: number;
  tipo: string;
  cantidad: number;
}

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  usuario: any;
  idUser;
  nombreUser;
  mesa;
  menus = [];
  displayedColumns: string[] = ['nombre', 'precio', 'cantidad', 'select'];
  dataSourceComidas: Menu[] = [];
  dataSourceBebidas: Menu[] = [];

  pedidoForm = new FormGroup({
    idMenu: new FormControl('', [Validators.required]),
    codigoMesa: new FormControl(''),
    nombreCliente: new FormControl(''),
    nombreMenu: new FormControl(''),
  });

  constructor(
    private fireServ: FirebaseService,
    private route: ActivatedRoute,
    public router: Router,
    private pedidoServ: PedidoService,
    public spinner: SpinnerService, ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
        this.mesa = this.router.getCurrentNavigation().extras.state.mesa;
        console.info("usuario", this.usuario)
        console.info("mesa", this.mesa)
      }
    });
  }

  ngOnInit() {
    this.getMenus('cocina').subscribe(res => {
      console.info('cocina', res)
      this.dataSourceComidas = res;
    });
    this.getMenus('barra').subscribe(res => {
      console.info('barra', res)
      this.dataSourceBebidas = res;
    });
  }

  getMenus(tipo) {
    return this.fireServ.traerColeccion("/menus").pipe(
      map(productos => {
        const auxMenus: any = productos.map(a => {
          const data: any = a.payload.doc.data();
          data.key = a.payload.doc.id;
          return data;
        });
        const auxRetorno: Array<any> = new Array<any>();
          for (const menu of auxMenus) {
            if ((menu.tipo as string) === tipo) {
              auxRetorno.push(menu);
            }
          }
          return auxRetorno;
      })
    );
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
    // const usrData = this.authServ.decodeToken();
    // this.nombreUser = usrData.data.username;
    // this.idUser = usrData.data.id;
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

