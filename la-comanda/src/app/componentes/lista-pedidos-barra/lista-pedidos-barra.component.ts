import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/servicios/snackbar.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { diccionario } from 'src/app/clases/diccionario';
import { AuthService } from 'src/app/servicios/auth.service';
import { ParserService } from 'src/app/servicios/parser.service';

@Component({
  selector: 'app-lista-pedidos-barra',
  templateUrl: './lista-pedidos-barra.component.html',
  styleUrls: ['./lista-pedidos-barra.component.css']
})
export class ListaPedidosBarraComponent implements OnInit {
  pedidos: any[];
  pedidosPendientes: any[];
  pedidosTomados: any[];
  usuario: any;

  constructor(
    private parserServ: ParserService,
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
          (element.estado == diccionario.estados_pedidos.en_preparacion && !element.estadoBarman)) &&
          this.tieneProductosDeTipo(element, 'barra')
      })
      this.pedidosTomados = res.filter(element => {
        return element.estado == diccionario.estados_pedidos.en_preparacion &&
          element.estadoBarman == diccionario.estados_pedidos.en_preparacion &&
          element.responsableBarman == this.usuario.key
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
      responsableBarman: this.usuario.key,
      estado: diccionario.estados_pedidos.en_preparacion,
      estadoBarman: diccionario.estados_pedidos.en_preparacion
    }).then(() => {
      pedido.estadoBarman = diccionario.estados_pedidos.en_preparacion
      this.verificarEnPreparacion(pedido);
      this.spinnerServ.hideLoadingSpinner();
      this.snackBar.openSnackBar("Pedido tomado", "Cerrar")
    });
  }

  verificarEnPreparacion(pedido: any) {
    console.log("pedido a verificar", pedido);
    console.log("tiene pedi en cocina", this.tieneProductosDeTipo(pedido, "cocina"))
    if ((this.tieneProductosDeTipo(pedido, "cocina") && pedido.estadoCocinero == diccionario.estados_pedidos.en_preparacion) ||
      (!this.tieneProductosDeTipo(pedido, "cocina"))) {
      console.log("esta en preparacion por todos", pedido)
      var horaEntrega = this.getHoraEntrega(pedido);
      console.log("fechaEntregaString", horaEntrega)
      this.fireServ.actualizar("pedidos", pedido.id, {
        horaEntrega: horaEntrega
      });
    } else {
      console.log("no esta en preparacion por todos", pedido)
    }
  }

  getHoraEntrega(pedido: any) {
    var oldDateObj = new Date();
    let tiempoElaboracion = this.getTiempoMax(pedido);
    console.log("tiempoElaboracion max", tiempoElaboracion)
    var newDateObj = new Date(oldDateObj.getTime() + tiempoElaboracion * 60000);
    return this.parserServ.parseDateTimeToStringHora(newDateObj)
  }

  getTiempoMax(pedido) {
    var tiempoMax;
    for (let index = 0; index < pedido.productoPedido.length; index++) {
      const element = pedido.productoPedido[index];
      if (index == 0) {
        tiempoMax = element.tiempoElaboracion;
      } else {
        if (element.tiempoElaboracion > tiempoMax) {
          tiempoMax = element.tiempoElaboracion;
        }
      }
    }
    return tiempoMax;
  }

  entregar(pedido) {
    this.spinnerServ.showLoadingSpinner();
    this.fireServ.actualizar("pedidos", pedido.id, {
      estadoBarman: diccionario.estados_pedidos.listo
    }).then(() => {
      pedido.estadoBarman = diccionario.estados_pedidos.listo;
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
      (pedido.estadoBarman == diccionario.estados_pedidos.listo &&
        pedido.estadoCocinero == diccionario.estados_pedidos.listo) ||
      (pedido.estadoBarman == diccionario.estados_pedidos.listo &&
        !this.tieneProductosDeTipo(pedido, "cocina")) ||
      (pedido.estadoCocinero == diccionario.estados_pedidos.listo &&
        !this.tieneProductosDeTipo(pedido, "barra"))
    ) {
      console.log("esta listo de todos", pedido)
      this.fireServ.actualizar("pedidos", pedido.id, {
        estado: diccionario.estados_pedidos.listo
      });
    } else {
      console.log("no listo por todos", pedido)
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
