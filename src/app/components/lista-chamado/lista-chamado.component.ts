import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/dialog.servcice';
import { Chamado } from 'src/app/model/chamado.model';
import { ResponseApi } from 'src/app/model/response-api';
import { ChamadoService } from 'src/app/services/chamado.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-lista-chamado',
  templateUrl: './lista-chamado.component.html',
  styleUrls: ['./lista-chamado.component.css']
})
export class ListaChamadoComponent implements OnInit {

  designadoParaMim: boolean = false;
  page: number = 0;
  count: number = 10;
  pages: Array<number>;
  shared: SharedService;
  message: {};
  classCss: {};
  listaChamado = [];
  filtroChamado = new Chamado('', null, '', '', null, '', '', null, '', '', null);
  chamadoSelecionado: Chamado;

  constructor(
    private dialogService: DialogService,
    private chamadoService: ChamadoService,
    private router: Router
  ) { 
    this.shared = SharedService.getInstance();
  }

  ngOnInit(){
    this.findAll(this.page, this.count);
  }

  findAll(page: number, count: number){
    this.chamadoService.findAll(page, count).subscribe((responseApi: ResponseApi) => {
      this.listaChamado = responseApi['data']['content'];
      this.pages = new Array(responseApi['data']['totalPages'])
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  filtrar(){
    this.page = 0;
    this.count = 10;
    this.chamadoService.findByParams(this.page, this.count, this.designadoParaMim, this.filtroChamado)
      .subscribe((responseApi: ResponseApi)=> {
        this.filtroChamado.titulo = this.filtroChamado.titulo == 'uninformed' ? '' : this.filtroChamado.titulo;
        this.filtroChamado.numero = this.filtroChamado.numero == 0 ? null : this.filtroChamado.numero;
        this.listaChamado = responseApi['data']['content'];
        this.pages = new Array(responseApi['data']['content']);
      }, err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
      });
  }

  limparFiltro(){
    this.designadoParaMim = false;
    this.page = 0;
    this.count = 10;
    this.filtroChamado = new Chamado('', null, '', '', null, '', '', null, '', '', null);
    this.findAll(this.page, this.count);
  }

  editar(id: string){
    this.router.navigate(['/edita-chamado', id]);
  }

  detalhar(id: string){
    this.router.navigate(['/detalha-chamado', id]);
  }

  selecionaExcluir(chamado: Chamado){
    this.chamadoSelecionado = chamado;
    console.log("***chamadoSelecionado", this.chamadoSelecionado);
  }

  delete(id: string){
          this.message = {};
          this.chamadoService.delete(id).subscribe((responseApi: ResponseApi) => {
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
