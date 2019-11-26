import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

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

}
