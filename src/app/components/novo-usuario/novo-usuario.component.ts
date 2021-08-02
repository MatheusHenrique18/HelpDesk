import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResponseApi } from 'src/app/model/response-api';
import { Usuario } from 'src/app/model/usuario.model';
import { SharedService } from 'src/app/services/shared.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  @ViewChild("form")
  form: NgForm

  usuario = new Usuario('', '', '', '');
  shared: SharedService;
  message: {};
  classCss: {};

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit(): void {
    let id: string = this.route.snapshot.params['id'];
    if (id != undefined) {
      this.findById(id);
    }
  }

  findById(id: string) {
    this.usuarioService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.usuario = responseApi.data;
      this.usuario.senha = '';
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  cadastrar(){
    this.message = {};
    this.usuarioService.createOrUpdate(this.usuario).subscribe((responseApi:ResponseApi) => {
        this.usuario = new Usuario(null,'','','');
        let usuarioRetorno : Usuario = responseApi.data;
        this.form.resetForm();
        this.showMessage({
          type: 'success',
          text: `Usuário: "${usuarioRetorno.email}" cadastrado com sucesso`
        });
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  private showMessage(message: {type: string, text: string}): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 5000);
  }

  private buildClasses(type: string): void {
     this.classCss = {
       'alert': true
     }
     this.classCss['alert-'+type] = true;
  }

  getFromGroupClass(isInvalid: boolean, isDirty): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };
  }

}
