import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JwtModuleOptions } from "@auth0/angular-jwt";
import { BrowserQRCodeReader } from '@zxing/library';
import { AngularFireModule } from '@angular/fire';

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
import { firebaseConfig } from '../environments/environment'


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
    PedidoComponent
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
    RecaptchaModule,
    RecaptchaFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
