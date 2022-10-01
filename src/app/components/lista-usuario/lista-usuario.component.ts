import { Usuario } from 'src/app/model/usuario.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseApi } from 'src/app/model/response-api';
import { SharedService } from 'src/app/services/shared.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DialogService } from '../../dialog.servcice';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {

  page: number=0;
  count: number=5;
  pages: Array<number>;
  shared: SharedService;
  message: {};
  classCss: {};
  listaUsuarios = [];
  usuarioSelecionado: Usuario;

  constructor(
    private dialogService: DialogService,
    private usuarioSerice: UsuarioService,
    private router: Router
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit(): void {
    this.findAll(this.page, this.count);
  }

  editar(id: string){
    this.router.navigate(['/novo-usuario', id]);
  }

  selecionaExcluir(usuario: Usuario){
    this.usuarioSelecionado = usuario;
    console.log("***chamadoSelecionado", this.usuarioSelecionado);
  }

  delete(id: string){
          this.message = {};
          this.usuarioSerice.delete(id).subscribe((responseApi: ResponseApi) => {
            this.showMessage({
              type: 'success',
              text: 'Usuário excluído com sucesso!'
            });
            this.findAll(this.page, this.count);
          }, err => {
            this.showMessage({
              type: 'error',
              text: err['error']['errors'][0]
            });
          });
  }

  findAll(page: number, count: number){
    this.usuarioSerice.findAll(page, count).subscribe((responseApi: ResponseApi) => {
      this.listaUsuarios = responseApi['data']['content'];
      this.pages = new Array(responseApi['data']['totalPages'])
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  setNextPage(event: any){
    event.preventDefault();
    if(this.page + 1 < this.pages.length){
      this.page = this.page + 1;
      this.findAll(this.page, this.count);
    }
  }

  setPreviousPage(event: any){
    event.preventDefault();
    if(this.page > 0){
      this.page = this.page - 1;
      this.findAll(this.page, this.count);
    }
  }

  setPage(i, event: any){
    event.preventDefault();
      this.page = i;
      this.findAll(this.page, this.count);
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

}
