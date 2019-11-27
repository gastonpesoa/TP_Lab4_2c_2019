import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { NologinGuard } from './guards/nologin.guard';
import { LoginGuard } from './guards/login.guard';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AltaUserComponent } from './componentes/alta-user/alta-user.component';
import { PedidoComponent } from './componentes/pedido/pedido.component';
import { HomeClienteComponent } from './componentes/home-cliente/home-cliente.component';
import { ListaEsperaComponent } from './componentes/lista-espera/lista-espera.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'home-cliente', component: HomeClienteComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'lista-espera', component: ListaEsperaComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'pedido', component: PedidoComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'login', component: LoginComponent,
    canActivate: [NologinGuard]
  },
  {
    path: 'registro', component: RegistroComponent,
    canActivate: [NologinGuard]
  },
  {
    path: 'alta-usuario', component: AltaUserComponent,
    canActivate: [LoginGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
