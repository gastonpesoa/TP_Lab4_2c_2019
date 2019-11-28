import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { SnackbarService } from 'src/app/servicios/snackbar.service';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { diccionario } from 'src/app/clases/diccionario';


@Component({
  selector: 'app-lista-espera',
  templateUrl: './lista-espera.component.html',
  styleUrls: ['./lista-espera.component.css']
})
export class ListaEsperaComponent implements OnInit {

  listaEsperaPendientes: any[];
  mesasLibres: any[];
  selected;
  userUid;

  constructor(
    public snackBar: SnackbarService,
    private firebaseServ: FirebaseService,
    private spinnerServ: SpinnerService,
    private db: AngularFirestore) { }

  ngOnInit() {
    this.spinnerServ.showLoadingSpinner();
    this.getListaEsperaPendientes().subscribe(res =>{
      console.info("lista espera", res);
      this.listaEsperaPendientes = res;
    })
    this.getMesasLibres().subscribe(res => {
      console.info("mesas libres", res);
      this.mesasLibres = res;
      this.spinnerServ.hideLoadingSpinner();
    })
  }

  public getListaEsperaPendientes() {
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
            if ((user.estado as string) === diccionario.estadod_lista_espera.pendiente) {
              auxRetorno.push(user);
            }
          }

          return auxRetorno;
        })
      );
  }

  public getMesasLibres() {
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

          const auxRetorno: Array<any> = new Array<any>();
          for (const mesa of auxMesas) {
            if ((mesa.estado as string) === diccionario.estados_mesas.libre) {
              auxRetorno.push(mesa);
            }
          }
          return auxRetorno;
        })
      );
  }

  asignarMesa(uid, listaKey){
    this.spinnerServ.showLoadingSpinner();
    console.info("cli uid", uid, "mesaKey", this.selected, "listaKey", listaKey)
    this.firebaseServ.actualizar('mesas', this.selected, {
      estado: diccionario.estados_mesas.asignada,
      ocupante: uid
    }).then(res => {
      this.firebaseServ.borrar('lista-espera', listaKey)
      .then(res => {
        this.spinnerServ.hideLoadingSpinner();
        this.snackBar.openSnackBar(
          "Se asignó la mesa al cliente", 'Cerrar'
        );
      })
    })
  }

  cancelar(uid){
    this.spinnerServ.showLoadingSpinner();
    console.log("this.listaEsperaId", uid);
    this.firebaseServ.borrar('lista-espera', uid)
      .then(res => {
        this.spinnerServ.hideLoadingSpinner();
        this.snackBar.openSnackBar(
          'Borraste de la lista de espera al cliente.', 'Cerrar'
        );
      })
  }

}
