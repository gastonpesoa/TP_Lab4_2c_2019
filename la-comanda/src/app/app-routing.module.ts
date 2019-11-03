import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { NologinGuard } from './guards/nologin.guard';
import { LoginGuard } from './guards/login.guard';
import { RegistroComponent } from './componentes/registro/registro.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NologinGuard] },
  { path: 'registro', component: RegistroComponent, canActivate: [NologinGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
