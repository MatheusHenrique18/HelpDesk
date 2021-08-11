import { Component, OnInit } from '@angular/core';
import { Contadores } from 'src/app/model/contadores.model';
import { ResponseApi } from 'src/app/model/response-api';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-contadores',
  templateUrl: './contadores.component.html',
  styleUrls: ['./contadores.component.css']
})
export class ContadoresComponent implements OnInit {

  contadores: Contadores = new Contadores();
  message: {};
  classCss: {};

  constructor(
    private chamadoService: ChamadoService
  ) { }

  ngOnInit(){
    this.chamadoService.listarContadores().subscribe((responseAPI: ResponseApi) => {
      this.contadores = responseAPI.data;
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
