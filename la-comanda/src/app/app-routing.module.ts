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
import { ListaPedidosComponent } from './componentes/lista-pedidos/lista-pedidos.component';
import { ListaPedidosCocinaComponent } from './componentes/lista-pedidos-cocina/lista-pedidos-cocina.component';
import { ListaPedidosBarraComponent } from './componentes/lista-pedidos-barra/lista-pedidos-barra.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { ClienteGuard } from './guards/cliente.guard';
import { AdminGuard } from './guards/admin.guard';
import { MozoGuard } from './guards/mozo.guard';
import { CocineroGuard } from './guards/cocinero.guard';
import { BarmanGuard } from './guards/barman.guard';
import { SocioGuard } from './guards/socio.guard';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [LoginGuard] },
  { path: 'home-cliente', component: HomeClienteComponent, canActivate: [LoginGuard] },
  { path: 'lista-espera', component: ListaEsperaComponent, canActivate: [LoginGuard] },
  { path: 'lista-pedidos', component: ListaPedidosComponent, canActivate: [LoginGuard] },
  { path: 'lista-pedidos-cocina', component: ListaPedidosCocinaComponent, canActivate: [LoginGuard] },
  { path: 'lista-pedidos-barra', component: ListaPedidosBarraComponent, canActivate: [LoginGuard] },
  { path: 'encuesta', component: EncuestaComponent, canActivate: [LoginGuard] },
  { path: 'pedido', component: PedidoComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NologinGuard] },
  { path: 'registro', component: RegistroComponent, canActivate: [NologinGuard] },
  { path: 'alta-usuario', component: AltaUserComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
