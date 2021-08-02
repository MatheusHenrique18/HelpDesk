import { Usuario } from "./usuario.model";

export class Chamado {
    constructor(
        public id: string,
        public usuario: Usuario,
        public data: string,
        public titulo: string,
        public numero: number,
        public status: string,
        public prioridade: string,
        public usuarioDesignado: Usuario,
        public descricao: String,
        public imagem: string,
        public historicoStatus: Array<string>

    ){}
}