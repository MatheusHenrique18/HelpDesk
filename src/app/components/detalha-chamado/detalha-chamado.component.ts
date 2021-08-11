import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chamado } from 'src/app/model/chamado.model';
import { ResponseApi } from 'src/app/model/response-api';
import { ChamadoService } from 'src/app/services/chamado.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-detalha-chamado',
  templateUrl: './detalha-chamado.component.html',
  styleUrls: ['./detalha-chamado.component.css']
})
export class DetalhaChamadoComponent implements OnInit {

  chamado = new Chamado('', null, '', '', null, '', '', null, '', '', null);
  shared: SharedService;
  message: {};
  classCss: {};
  
  constructor(
    private chamadoService: ChamadoService,
    private route: ActivatedRoute
  ) { 
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    let id: string = this.route.snapshot.params['id'];
    
    if( id != undefined){
      this.findById(id);
    }
  }

  findById(id: string) {
    this.chamadoService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.chamado = responseApi.data;
      this.chamado.data = new Date(this.chamado.data).toISOString();
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  changeStatus(status: string): void{
    this.chamadoService.changeStatus(status, this.chamado).subscribe((responseApi: ResponseApi) => {
      this.chamado = responseApi.data;
      this.chamado.data = new Date(this.chamado.data).toISOString();
      this.findById(this.chamado.id);
      this.showMessage({
        type: 'success',
        text: 'Status alterado com sucesso.'
      });
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  private showMessage(message: { type: string, text: string }): void {
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
    this.classCss['alert-' + type] = true;
  }

}
