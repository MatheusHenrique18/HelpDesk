import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chamado } from '../model/chamado.model';
import { HELP_DESK_API } from './helpdesk.api';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  constructor(private http: HttpClient) { }

  createOrUpdate(chamado: Chamado){
    if(chamado.id != null && chamado.id != ''){
      return this.http.put(`${HELP_DESK_API}/api/chamado`, chamado);
    }else{
      chamado.status = 'NOVO';
      return this.http.post(`${HELP_DESK_API}/api/chamado`, chamado);
    }
  }

  findAll(page: number, count: number){
    return this.http.get(`${HELP_DESK_API}/api/chamado/${page}/${count}`);
  }

  findById(id: string){
    return this.http.get(`${HELP_DESK_API}/api/chamado/${id}`);
  }

  delete(id: string){
    return this.http.delete(`${HELP_DESK_API}/api/chamado/${id}`);
  }

  findByParams(page: number, count: number, assignedToMe: boolean, chamado: Chamado){
    chamado.numero = chamado.numero == null ? 0 : chamado.numero;
    chamado.titulo = chamado.titulo == '' ? 'uninformed' : chamado.titulo;
    chamado.status = chamado.status == '' ? 'uninformed' : chamado.status;
    chamado.prioridade = chamado.prioridade == '' ? 'uninformed' : chamado.prioridade;
    return this.http.get(`${HELP_DESK_API}/api/chamado/${page}/${count}/${chamado.numero}/${chamado.titulo}/${chamado.status}/${chamado.prioridade}/${assignedToMe}`);
  }

  changeStatus(status: string, chamado: Chamado){
    return this.http.put(`${HELP_DESK_API}/api/chamado/${chamado.id}/${status}`, chamado);
  }

  listarContadores(){
    return this.http.get(`${HELP_DESK_API}/api/chamado/contadores`);
  }

}
