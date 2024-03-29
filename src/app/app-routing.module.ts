import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NovoUsuarioComponent } from './components/novo-usuario/novo-usuario.component';
import { ListaUsuarioComponent } from './components/lista-usuario/lista-usuario.component';
import { LoginComponent } from './components/security/login/login.component';
import { AuthGuard } from './components/security/auth.guard';
import { NovoChamadoComponent } from './components/novo-chamado/novo-chamado.component';
import { ListaChamadoComponent } from './components/lista-chamado/lista-chamado.component';
import { DetalhaChamadoComponent } from './components/detalha-chamado/detalha-chamado.component';
import { ContadoresComponent } from './components/contadores/contadores.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'novo-usuario', component: NovoUsuarioComponent, canActivate: [AuthGuard]},
  {path: 'novo-usuario/:id', component: NovoUsuarioComponent, canActivate: [AuthGuard]},
  {path: 'lista-usuario', component: ListaUsuarioComponent, canActivate: [AuthGuard]},
  {path: 'novo-chamado', component: NovoChamadoComponent, canActivate: [AuthGuard]},
  {path: 'novo-chamado/:id', component: NovoChamadoComponent, canActivate: [AuthGuard]},
  {path: 'lista-chamado', component: ListaChamadoComponent, canActivate: [AuthGuard]},
  {path: 'detalha-chamado/:id', component: DetalhaChamadoComponent, canActivate: [AuthGuard]},
  {path: 'contadores', component: ContadoresComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
