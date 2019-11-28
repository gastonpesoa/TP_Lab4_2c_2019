import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { SnackbarService } from 'src/app/servicios/snackbar.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { diccionario } from 'src/app/clases/diccionario';

@Component({
  selector: 'app-lista-pedidos-cocina',
  templateUrl: './lista-pedidos-cocina.component.html',
  styleUrls: ['./lista-pedidos-cocina.component.css']
})
export class ListaPedidosCocinaComponent implements OnInit {

  pedidos: any[];
  pedidosPendientes: any[];
  pedidosTomados: any[];
  usuario: any;

  constructor(
    private authServ: AuthService,
    private snackBar: SnackbarService,
    private spinnerServ: SpinnerService,
    private fireServ: FirebaseService
  ) { }

  ngOnInit() {
    this.spinnerServ.showLoadingSpinner();
    this.authServ.getUserData().subscribe(res => {
      this.usuario = res;
      this.getPedidos()
    });

  }

  getPedidos() {
    this.fireServ.getCollection('pedidos').subscribe(res => {
      this.pedidos = res;

      this.pedidosPendientes = res.filter(element => {
        return (element.estado == diccionario.estados_pedidos.aceptado ||
          (element.estado == diccionario.estados_pedidos.en_preparacion && !element.estadoCocinero)) &&
          this.tieneProductosDeTipo(element, 'cocina')
      })
      this.pedidosTomados = res.filter(element => {
        return element.estado == diccionario.estados_pedidos.en_preparacion &&
          element.estadoCocinero == diccionario.estados_pedidos.en_preparacion &&
          element.responsableCocinero == this.usuario.key
      })
      // console.info("pedidos ", this.pedidos)
      // console.info("pedidos pendientes", this.pedidosPendientes)
      // console.info("pedidos tomados", this.pedidosTomados)
      this.spinnerServ.hideLoadingSpinner();
    })
  }

  tomar(pedido) {
    this.spinnerServ.showLoadingSpinner();
    this.fireServ.actualizar("pedidos", pedido.id, {
      responsableCocinero: this.usuario.key,
      estado: diccionario.estados_pedidos.en_preparacion,
      estadoCocinero: diccionario.estados_pedidos.en_preparacion
    }).then(() => {
      this.spinnerServ.hideLoadingSpinner();
      this.snackBar.openSnackBar("Pedido tomado", "Cerrar")
    });
  }

  entregar(pedido) {
    this.spinnerServ.showLoadingSpinner();
    this.fireServ.actualizar("pedidos", pedido.id, {
      estadoCocinero: diccionario.estados_pedidos.listo
    }).then(() => {
      pedido.estadoCocinero = diccionario.estados_pedidos.listo;
      this.verificarPedidoListo(pedido);
      this.spinnerServ.hideLoadingSpinner();
      this.snackBar.openSnackBar("Pedido entregado", "Cerrar")
    })
  }

  verificarPedidoListo(pedido) {
    // console.log("verificando pedido", pedido)
    // console.log("tieneProductos cocina", this.tieneProductosDeTipo(pedido, "cocina"))
    // console.log("tieneProductos barra", this.tieneProductosDeTipo(pedido, "barra"))
    if (
      (pedido.estadoBartender == diccionario.estados_pedidos.listo &&
        pedido.estadoCocinero == diccionario.estados_pedidos.listo) ||
      (pedido.estadoBartender == diccionario.estados_pedidos.listo &&
        !this.tieneProductosDeTipo(pedido, "cocina")) ||
      (pedido.estadoCocinero == diccionario.estados_pedidos.listo &&
        !this.tieneProductosDeTipo(pedido, "barra"))
    ) {
      // console.log("esta listo de todos", pedido)
      this.fireServ.actualizar("pedidos", pedido.id, {
        estado: diccionario.estados_pedidos.listo
      });
    } else {
      // console.log("no listo por todos", pedido)
    }
  }

  tieneProductosDeTipo(pedido, tipo) {
    let result = false;
    pedido.productoPedido.forEach(element => {
      if (element.tipo == tipo) {
        result = true
      }
    });
    return result
  }


}
