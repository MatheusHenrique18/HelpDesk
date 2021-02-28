import { HELP_DESK_API } from './helpdesk.api';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  login(usuario: Usuario){
    return this.http.post(`${HELP_DESK_API}/api/auth`, usuario);
  }

  createOrUpdate(usuario: Usuario){
    if(usuario.id != null && usuario.id != ''){
      return this.http.put(`${HELP_DESK_API}/api/usuario`, usuario);
    }else{
      return this.http.post(`${HELP_DESK_API}/api/usuario`, usuario);
    }
  }

  findById(id: string){
    return this.http.get(`${HELP_DESK_API}/api/usuario/${id}`);
  }

  findAll(page: number, count: number){
    return this.http.get(`${HELP_DESK_API}/api/usuario/${page}/${count}`);
  }

  delete(id: string){
    return this.http.delete(`${HELP_DESK_API}/api/usuario/${id}`);
  }

}
