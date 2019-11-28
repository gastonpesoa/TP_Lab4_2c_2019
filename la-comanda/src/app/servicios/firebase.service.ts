import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference, QueryFn, DocumentChangeAction } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  newName: string;
  storeRef: AngularFirestoreCollection<any>;

  constructor(
    private fStorage: AngularFireStorage,
    private db: AngularFirestore) {
    this.storeRef = this.db.collection("files");
  }

  uploadToStorage(info): AngularFireUploadTask {
    console.info("info", info);
    this.newName = `${new Date().getTime()}.jpeg`;
    return this.fStorage.ref(`files/${this.newName}`).putString(info, 'data_url');
  }

  traerColeccion(path: string, query: QueryFn = null): Observable<DocumentChangeAction<unknown>[]> {
    if(query == null)
      return this.db.collection(path).snapshotChanges();
    else
      return this.db.collection(path, query).snapshotChanges();
  }

  public crear(path: string, objeto: any): Promise<DocumentReference> {
    return this.db.collection(path).add(objeto);
  }

  borrar(path: string, doc: string) {
    return this.db.collection(path).doc(doc).delete();
  }

  public actualizar(path: string, doc: string, valor: any) {
    return this.db
      .collection(path)
      .doc(doc)
      .update(valor);
  }

  getCollection(collection) {
    return this.db.collection(collection).snapshotChanges().pipe(map(res => {
      return res.map(a => {
        const data: any = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

}
