import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JwtModuleOptions } from "@auth0/angular-jwt";

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { SidenavComponent } from './componentes/sidenav/sidenav.component';
import { ToolbarComponent } from './componentes/toolbar/toolbar.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { MaterialModule } from './material.module';
import { AltaUserComponent } from './componentes/alta-user/alta-user.component';
import { PedidoComponent } from './componentes/pedido/pedido.component';
import { firebaseConfig } from '../environments/environment';
import { HomeClienteComponent } from './componentes/home-cliente/home-cliente.component';
import { ListaEsperaComponent } from './componentes/lista-espera/lista-espera.component';
import { ListaPedidosComponent } from './componentes/lista-pedidos/lista-pedidos.component';
import { ListaPedidosCocinaComponent } from './componentes/lista-pedidos-cocina/lista-pedidos-cocina.component';
import { ListaPedidosBarraComponent } from './componentes/lista-pedidos-barra/lista-pedidos-barra.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component'


export function tokenGetter() {
  return localStorage.getItem("access_token");
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidenavComponent,
    ToolbarComponent,
    RegistroComponent,
    AltaUserComponent,
    PedidoComponent,
    HomeClienteComponent,
    ListaEsperaComponent,
    ListaPedidosComponent,
    ListaPedidosCocinaComponent,
    ListaPedidosBarraComponent,
    EncuestaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:4200", "https://slipping-journals.000webhostapp.com"]
      }
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
