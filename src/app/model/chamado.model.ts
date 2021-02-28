import { Usuario } from "./usuario.model";

export class Chamado {
    constructor(
        public id: string,
        public numero: number,
        public titulo: string,
        public status: string,
        public prioridade: string,
        public imagem: string,
        public usuario: Usuario,
        public usuarioDesignado: Usuario,
        public data: string,
        public historicoStatus: Array<string>
    ){}
}