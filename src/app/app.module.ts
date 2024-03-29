import { AuthInterceptor } from './components/security/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/security/login/login.component';
import { UsuarioService } from './services/usuario.service';
import { SharedService } from './services/shared.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NovoUsuarioComponent } from './components/novo-usuario/novo-usuario.component';
import { AuthGuard } from './components/security/auth.guard';
import { ListaUsuarioComponent } from './components/lista-usuario/lista-usuario.component';
import { DialogService } from './dialog.servcice';
import { NovoChamadoComponent } from './components/novo-chamado/novo-chamado.component';
import { ChamadoService } from './services/chamado.service';
import { ListaChamadoComponent } from './components/lista-chamado/lista-chamado.component';
import { DetalhaChamadoComponent } from './components/detalha-chamado/detalha-chamado.component';
import { ContadoresComponent } from './components/contadores/contadores.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NovoUsuarioComponent,
    ListaUsuarioComponent,
    NovoChamadoComponent,
    ListaChamadoComponent,
    DetalhaChamadoComponent,
    ContadoresComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    UsuarioService,
    ChamadoService,
    SharedService,
    DialogService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
