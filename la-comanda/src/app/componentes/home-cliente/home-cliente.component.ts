import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { diccionario } from 'src/app/clases/diccionario';
import { ParserService } from 'src/app/servicios/parser.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { SnackbarService } from 'src/app/servicios/snackbar.service';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.css']
})
export class HomeClienteComponent implements OnInit {
  userListaEspera: any;
  usuario: any;
  puedeSolicitarMesa: boolean;
  puedeVerPedidoORealizarEncuesta: boolean;
  esperandoAsignacion: boolean;
  clienteAceptado: boolean;
  userMesa: any;
  mesa: any = null;
  puedeGenerarPedido: boolean;
  userPedidos: any;
  pedidoUser: any = null;
  flagEstaActivo: boolean;
  listaEsperaId: any;
  cuentaSolicitada: boolean = false;
  puedeHacerEncuesta: boolean = true;

  constructor(
    public router: Router,
    public snackBar: SnackbarService,
    private firebaseServ: FirebaseService,
    private parserServ: ParserService,
    private authServ: AuthService,
    public db: AngularFirestore,
    public spinnerServ: SpinnerService
  ) { }

  ngOnInit() {
    this.spinnerServ.showLoadingSpinner();
    this.authServ.getUserData().subscribe(res => {
      this.usuario = res;
      this.inicioPagina();
    });
  }

  public traerUserListaEspera(valor: string) {
    return this.db
      .collection('lista-espera')
      .snapshotChanges()
      .pipe(
        map(users => {
          const auxUsers: any = users.map(a => {
            const data: any = a.payload.doc.data();
            data.key = a.payload.doc.id;
            return data;
          });

          const auxRetorno: Array<any> = new Array<any>();
          for (const user of auxUsers) {
            if ((user.clienteId as string) === valor) {
              auxRetorno.push(user);
            }
          }
          return auxRetorno;
        })
      );
  }

  public traerUserMesa(valor: string) {
    return this.db
      .collection('mesas')
      .snapshotChanges()
      .pipe(
        map(mesa => {
          const auxMesas: any = mesa.map(a => {
            const data: any = a.payload.doc.data();
            data.key = a.payload.doc.id;
            return data;
          });

          var auxRetorno: any;
          for (const mesa of auxMesas) {
            if ((mesa.ocupante as string) === valor) {
              auxRetorno = mesa;
              break;
            }
          }
          return auxRetorno;
        })
      );
  }

  public traerUserPedidos(valor: string) {
    return this.db
      .collection('pedidos')
      .snapshotChanges()
      .pipe(
        map(pedido => {
          const auxPedido: any = pedido.map(a => {
            const data: any = a.payload.doc.data();
            data.key = a.payload.doc.id;
            return data;
          });
          const auxRetorno: Array<any> = new Array<any>();
          for (const pedido of auxPedido) {
            if ((pedido.cliente as string) === valor && pedido.estado != 'cerrado') {
              auxRetorno.push(pedido);
              break;
            }
          }
          return auxRetorno;
        })
      );
  }

  public inicioPagina() {

    //Revisa listado de mesas - Se busca la que tenga asignada el cliente
    this.userMesa = this.traerUserMesa(
      this.usuario.uid
    ).subscribe((mesaDeUser) => {
      this.mesa = null;
      if (mesaDeUser != undefined) {
        //El cliente tiene una mesa relacionada

        this.mesa = mesaDeUser;
        if (mesaDeUser.estado === diccionario.estados_mesas.asignada) {

          //El cliente tiene mesa asignada
          console.log('El cliente tiene mesa asignada', this.mesa);
          this.puedeGenerarPedido = true;
          this.puedeVerPedidoORealizarEncuesta = false;
          this.esperandoAsignacion = false;
        }

        if (mesaDeUser.estado === diccionario.estados_mesas.ocupada) {

          // El cliente esta acupando una mesa
          this.userPedidos = this.traerUserPedidos(
            this.usuario.uid
          ).subscribe((pedidoDeUser) => {
            this.pedidoUser = null;
            console.log('Registro de pedido del usuario', pedidoDeUser);
            if (pedidoDeUser != undefined) {

              // El cliente tiene un pedido
              console.log('El cliente tiene pedido');
              this.pedidoUser = pedidoDeUser;
              this.puedeVerPedidoORealizarEncuesta = true;
              this.puedeGenerarPedido = false;
              this.puedeSolicitarMesa = false;
              this.esperandoAsignacion = false;
              this.spinnerServ.hideLoadingSpinner();
              return;
            }
          });
        }

        this.spinnerServ.hideLoadingSpinner();
        return;
      } else {
        console.log("cli no tiene mesa ni pedido")
        console.log("this.flagEstaActivo", this.flagEstaActivo)

        this.puedeSolicitarMesa = false;
        this.puedeGenerarPedido = false;
        this.puedeVerPedidoORealizarEncuesta = false;
        this.esperandoAsignacion = false;

      }
    });

    // Reviso la lista de espera;
    this.userListaEspera = this.traerUserListaEspera(
      this.usuario.uid
    ).subscribe((users: Array<any>) => {
      console.log('Registros de la lista de espera', users);

      if (users.length === 0) {

        // El cliente no está en lista de espera, puede solicitar mesa
        console.log('El cliente no está en la lista de espera');
        if (this.mesa == null) {
          this.puedeSolicitarMesa = true;
          this.puedeVerPedidoORealizarEncuesta = false;
          this.esperandoAsignacion = false;
          this.flagEstaActivo = false;
        }
        this.spinnerServ.hideLoadingSpinner();
        return;
      }

      // El cliente está en lista de espera
      this.listaEsperaId = users[0].key;
      console.log('El cliente está en la lista de espera', this.listaEsperaId);
      this.esperandoAsignacion = true;
      this.puedeSolicitarMesa = false;
      this.flagEstaActivo = true;
      this.spinnerServ.hideLoadingSpinner();
    });
  }

  solicitarMesa() {
    this.spinnerServ.showLoadingSpinner();
    const fecha: Date = new Date();
    const listaEspera: any = {
      estado: diccionario.estadod_lista_espera.pendiente,
      fecha: this.parserServ.parseDateTimeToStringDateTime(fecha),
      clienteId: this.usuario.uid,
      cliente: this.usuario
    };
    this.firebaseServ
      .crear('lista-espera', listaEspera)
      .then((doc: DocumentReference) => {
        this.puedeSolicitarMesa = false;
        this.spinnerServ.hideLoadingSpinner();
        this.snackBar.openSnackBar(
          'Te agregaste a la lista de espera. Aguardá que el mozo te asigne una mesa para continuar.', ''
        );
      });
  }

  cancelarEspera() {
    this.spinnerServ.showLoadingSpinner();
    console.log("this.listaEsperaId", this.listaEsperaId);
    this.firebaseServ.borrar('lista-espera', this.listaEsperaId)
      .then(res => {
        this.spinnerServ.hideLoadingSpinner();
        this.snackBar.openSnackBar(
          'Te borraste de la lista de espera.', ''
        );
      })
  }

  pedir() {
    let navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario,
        mesa: this.mesa
      }
    };
    this.router.navigate(['/pedido'], navigationExtras);
  }

  encuesta() {
    this.puedeHacerEncuesta = false;
    this.router.navigate(['encuesta']);
  }

  confirmarEntrega() {
    this.spinnerServ.showLoadingSpinner();
    console.log("this.pedidoUser", this.pedidoUser)
    console.log("this.pedidoUser key", this.pedidoUser[0].key)
    this.firebaseServ.actualizar('pedidos', this.pedidoUser[0].key, {
      estado: diccionario.estados_pedidos.entregado
    }).then(() => {
      this.spinnerServ.hideLoadingSpinner();
      this.snackBar.openSnackBar(
        'Que disfrutes tu pedido.', 'Cerrar'
      );
    })
  }

  pagar() {
    this.spinnerServ.showLoadingSpinner();
    console.log("this.pedidoUser", this.pedidoUser)
    this.firebaseServ.actualizar('pedidos', this.pedidoUser[0].key, {
      estado: diccionario.estados_pedidos.cuenta
    }).then(() => {
      this.cuentaSolicitada = true;
      this.pedidoUser = null;
      // this.mesa = null;
      // this.puedeSolicitarMesa = true;
      // this.puedeVerPedidoORealizarEncuesta = false;
      // this.esperandoAsignacion = false;
      this.spinnerServ.hideLoadingSpinner();
      this.snackBar.openSnackBar(
        'Gracias.', 'Cerrar'
      );
    })
  }

}
