import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { Pedido } from 'src/app/clases/pedido';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { map } from 'rxjs/operators'
import { diccionario } from 'src/app/clases/diccionario';
import { ParserService } from 'src/app/servicios/parser.service';
import { DocumentReference } from '@angular/fire/firestore';
import { SnackbarService } from 'src/app/servicios/snackbar.service';

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

  public itemsPedido: Array<any>;
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
  subtotal: number;
  puedeGuardar: boolean;

  constructor(
    private parseServ: ParserService,
    private fireServ: FirebaseService,
    private route: ActivatedRoute,
    public router: Router,
    public snackBar: SnackbarService,
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
    this.spinner.showLoadingSpinner();
    this.itemsPedido = new Array<any>();
    this.getMenus('cocina').subscribe(res => {
      console.info('cocina', res)
      this.dataSourceComidas = res;
    });
    this.getMenus('barra').subscribe(res => {
      console.info('barra', res)
      this.dataSourceBebidas = res;
      this.spinner.hideLoadingSpinner();
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

  agregarAlPedido(element) {
    var inputValue = (<HTMLInputElement>document.getElementById("cant_" + element.id)).value;
    const idProducto = element.id;
    const cantidad = parseInt(inputValue, 10);

    // Si existe solo sumo la cantidad al pedido
    let productoYaElegido = false;
    this.itemsPedido.forEach(item => {
      if (item.idProducto == idProducto) {
        item.cantidad += cantidad;
        productoYaElegido = true;
      }
    });

    // // Si no existe lo agrego al pedido
    var dateNow = new Date();
    if (!productoYaElegido) {
      const productoAAgregar = {
        cantidad,
        nombre: element.nombre,
        idProducto: element.id,
        tipo: element.tipo,
        estado: diccionario.estados_productos.en_preparacion,
        precio: element.precio,
        tiempoElaboracion: element.tiempo,
        // Este es el tiempo de entrega hecho en date
        entrega: this.parseServ.parseDateTimeToStringDateTime(
          new Date(dateNow.getTime() + element.tiempo * 60000)
        )
      }
      this.itemsPedido.push(productoAAgregar);
      console.info("se agrega producto ", productoAAgregar, "al los pedidos", this.itemsPedido);
    }
    this.subtotal = 0;
    this.itemsPedido.forEach(item => {
      this.subtotal += (item.cantidad * item.precio);
    })
    this.puedeGuardar = true;
  }

  sacarItem(idPruducto) {
    this.itemsPedido = this.itemsPedido.filter(
      item => item.idProducto !== idPruducto
    );
    this.subtotal = 0;
    this.itemsPedido.forEach(item => {
      this.subtotal += (item.cantidad * item.precio);
    })
    if (this.itemsPedido.length < 1) {
      this.puedeGuardar = false;
    }
  }

  puedeGuardarPedido() {
    return this.puedeGuardar && this.mesa != '';
  }

  pedir() {
    this.spinner.showLoadingSpinner();
    if (!this.puedeGuardar) {
      return;
    }

    let pedido = {
      productoPedido: this.itemsPedido,
      mesa: this.mesa.key,
      mesaNumero: this.mesa.numero,
      mesaFoto: this.mesa.foto,
      cliente: this.usuario.uid,
      clienteNombre: this.usuario.nombre,
      estado: diccionario.estados_pedidos.solicitado,
      subtotal: this.subtotal
    }
    console.log("pedido", pedido)

    this.fireServ.crear('pedidos', pedido)
      .then((pedido: DocumentReference) => {
        this.fireServ.actualizar('mesas', this.mesa.key, {
          estado: diccionario.estados_mesas.ocupada
        }).then(()=>{
          this.spinner.hideLoadingSpinner();
          this.router.navigate(['/home-cliente'])
          this.snackBar.openSnackBar("Pedido registrado, puede hacer el seguimiento del mismo", "Cerrar");
        })
      });
  }

  cancel() {
    this.subtotal = 0;
    this.puedeGuardar = false;
    this.itemsPedido = new Array<any>();
    this.router.navigate(['/home-cliente'])
  }
}

