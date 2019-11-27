import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { FirebaseService } from './firebase.service';
import { User } from '../clases/user';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireServ: FirebaseService,
    private AFauth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore) {
  }

  private loggedIn = new BehaviorSubject<boolean>(false);
  private loggedOut = new BehaviorSubject<boolean>(true);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isLoggedOut() {
    return this.loggedOut.asObservable();
  }

  public isAuthenticated() {

    this.loggedIn.next(true);
    this.loggedOut.next(false);
  }

  public logOut() {
    this.AFauth.auth.signOut().then(() => {
      console.info("signOut")
      this.loggedIn.next(false);
      this.loggedOut.next(true);
      this.router.navigate(['/login']);
    })
  }

  getCurrentUser() {
    let user = this.AFauth.auth.currentUser;
    return user;
  }

  getUsuarios() {
    return this.db.collection("usuarios").snapshotChanges().pipe(map(users => {
      return users.map(a => {
        const data = a.payload.doc.data() as User;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  public getUserData() {
    let user = this.AFauth.auth.currentUser;
    return this.db
      .collection('usuarios')
      .snapshotChanges()
      .pipe(
        map(usuario => {
          const auxUsuarios: any = usuario.map(a => {
            const data: any = a.payload.doc.data();
            data.key = a.payload.doc.id;
            return data;
          });

          var auxRetorno: any;
          for (const usuario of auxUsuarios) {
            if ((usuario.key as string) === user.uid) {
              auxRetorno = usuario;
              break;
              // console.log('Añadido a la lista proveniente de la base de datos para las reservas');
            }
          }

          return auxRetorno;
        })
      );
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.AFauth.auth.signInWithEmailAndPassword(email, password)
        .then(user => {
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    })
  }

  register(name: string, email: string, password: string, file?: string) {
    return new Promise((resolve, reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, password)
        .then(res => {
          const uid = res.user.uid;
          this.db.collection("usuarios").doc(res.user.uid).set({
            nombre: name,
            uid: uid,
            tipo: 'cliente'
          })
          if (file)
            this.subirFoto(file, res.user.uid)
          resolve(res)
        })
        .catch(error => { reject(error) });
    });
  }

  subirFoto(file, uid) {
    this.fireServ.uploadToStorage(file)
      .then(res => {
        console.log("uploadToStorage res", res)
        res.ref.getDownloadURL()
          .then(url => {
            this.updateFotoUsuario(uid, url)
              .then(res => {
                console.info("updateFotoUsuario res", res)
              })
              .catch(err => {
                console.info("updateFotoUsuario err", err)
              })
          })
          .catch(err => {
            console.info("err");
            return err.message;
          })
      });
  }

  updateFotoUsuario(uid: string, url: any) {
    return this.db.collection('usuarios').doc(uid)
      .set({ foto: url }, { merge: true });
  }

}
