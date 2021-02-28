import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/model/current-user.model';
import { Usuario } from 'src/app/model/usuario.model';
import { SharedService } from 'src/app/services/shared.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new Usuario('','','','');
  shared: SharedService;
  message: string;

  constructor( private usuarioService: UsuarioService, private router: Router ) {
    this.shared = SharedService.getInstance();
   }

  ngOnInit(): void {
  }

  login(){
    this.message = '';
    this.usuarioService.login(this.usuario).subscribe((userAuthenticacion: CurrentUser) => {
      this.shared.token = userAuthenticacion.token;
      this.shared.usuario = userAuthenticacion.usuario;
      this.shared.usuario.perfil = this.shared.usuario.perfil.substring(5);
      this.shared.showTemplate.emit(true);
      this.router.navigate(['/']);
    }, err =>{
      this.shared.token = null;
      this.shared.usuario = null;
      this.shared.showTemplate.emit(false);
      this.message = 'Error';
    });
  }

  cancelLogin(){
    this.message = '';
    this.usuario = new Usuario('','','','');
    window.location.href = '/login';
    window.location.reload();
  }

  getFromGroupClass(isInvalid: boolean, isDirty): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };
  }


}
