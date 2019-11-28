import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Mesa } from '../componentes/home/home.component';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(public db: AngularFirestore) { }

  getMesas() {
    return this.db.collection("mesas").snapshotChanges().pipe(map(mesas => {
      return mesas.map(a => {
        const data: any = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }
}
