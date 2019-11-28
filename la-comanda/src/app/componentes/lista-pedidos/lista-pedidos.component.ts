import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { diccionario } from 'src/app/clases/diccionario';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { SnackbarService } from 'src/app/servicios/snackbar.service';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {
  pedidos: any[];
  pedidosSolicitados: any[];
  pedidosListos: any[];
  pedidosCuenta: any[];

  constructor(
    private snackBar: SnackbarService,
    private spinnerServ: SpinnerService,
    private fireServ: FirebaseService
  ) { }

  ngOnInit() {
    this.getPedidos();
  }

  getPedidos() {
    this.fireServ.getCollection('pedidos').subscribe(res => {
      this.pedidos = res;
      this.pedidosSolicitados = res.filter(element => {
        return element.estado == diccionario.estados_pedidos.solicitado
      })
      this.pedidosListos = res.filter(element => {
        return element.estado == diccionario.estados_pedidos.listo
      })
      this.pedidosCuenta = res.filter(element => {
        return element.estado == diccionario.estados_pedidos.cuenta
      })
      console.info("pedidos ", this.pedidos)
      console.info("pedidos solicitados", this.pedidosSolicitados)
      console.info("pedidos listos", this.pedidosListos)
      console.info("pedidos cuenta", this.pedidosCuenta)
    })
  }

  cancelar(uid) {
    this.spinnerServ.showLoadingSpinner();
    this.fireServ.borrar('pedidos', uid)
      .then(res => {
        this.spinnerServ.hideLoadingSpinner();
        this.snackBar.openSnackBar(
          'Rechazaste el pedido del cliente.', 'Cerrar'
        );
      })
  }

  aceptar(uid) {
    this.spinnerServ.showLoadingSpinner();
    console.info("pedido uid", uid)
    this.fireServ.actualizar('pedidos', uid, {
      estado: diccionario.estados_pedidos.aceptado,
    }).then(res => {
      this.spinnerServ.hideLoadingSpinner();
      this.snackBar.openSnackBar("Se aceptó el pedido del cliente", 'Cerrar');
    })
  }

  entregar(uid){
    this.spinnerServ.showLoadingSpinner();
    console.info("pedido uid", uid)
    this.fireServ.actualizar('pedidos', uid, {
      estado: diccionario.estados_pedidos.entregado_mozo,
    }).then(res => {
      this.spinnerServ.hideLoadingSpinner();
      this.snackBar.openSnackBar("Se entregó el pedido al cliente", 'Cerrar');
    })
  }

  confirmarYCerrar(pedido){
    this.spinnerServ.showLoadingSpinner();
    console.info("pedido uid", pedido.id)
    this.fireServ.actualizar('pedidos', pedido.id, {
      estado: diccionario.estados_pedidos.cerrado,
    }).then(res => {
      this.fireServ.actualizar('mesas', pedido.mesa, {
        estado: diccionario.estados_mesas.libre,
        ocupante : ''
      }).then(res => {
        // this.fireServ.borrar('pedidos', pedido.id)
        this.spinnerServ.hideLoadingSpinner();
        this.snackBar.openSnackBar("Se confirmó y cerró el pago y se liberó la mesa", 'Cerrar');
      })
    })
  }

}
