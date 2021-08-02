import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Chamado } from 'src/app/model/chamado.model';
import { ResponseApi } from 'src/app/model/response-api';
import { ChamadoService } from 'src/app/services/chamado.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-novo-chamado',
  templateUrl: './novo-chamado.component.html',
  styleUrls: ['./novo-chamado.component.css']
})
export class NovoChamadoComponent implements OnInit {

  @ViewChild("form")
  form: NgForm

  chamado = new Chamado('', null, '', '', 0, 'NOVO', '', null, '', '', null);
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
    if (id != undefined) {
      this.findById(id);
    }
  }


  findById(id: string) {
    this.chamadoService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.chamado = responseApi.data;
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  cadastrar(){
    this.message = {};
    this.chamadoService.createOrUpdate(this.chamado).subscribe((responseApi:ResponseApi) => {
        this.chamado = new Chamado('', null, '', '', 0, 'NOVO', '', null, '', '', null);
        let chamadoRetorno : Chamado = responseApi.data;
        this.form.resetForm();
        this.showMessage({
          type: 'success',
          text: `Chamado: "${chamadoRetorno.titulo}" cadastrado com sucesso`
        });
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  onFileChange(event): void{
    if(event.target.files[0].size > 2000000){
      this.showMessage({
        type: 'error',
        text: 'Tamanho máximo de imagem é de 2 MB.'
      });
    }else{
      this.chamado.imagem = '';
      var reader = new FileReader();
      reader.onloadend = (e: Event) => {
        this.chamado.imagem = String(reader.result);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
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

  getFromGroupClass(isInvalid: boolean, isDirty): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };
  }


}
