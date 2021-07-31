export interface Aulas {
    aulas: JsonAulas
}

export interface JsonAulas{
    aula_hora_entrada:           Date;
    aula_hora_entrada_prevista:  string;
    aula_hora_saida:             Date;
    aula_hora_saida_prevista:    string;
    aula_obs:                    string;
    aula_unidade:                string;
    aulas_data:                  Date;
    aulas_id:                    number;
    aulas_num:                   number;
    escolas_fk:                  number;
    sala_capacidade_aconselhada: number;
    sala_capacidade_maxima:      number;
    sala_equipamento_quantidade: string;
    sala_foto:                   string;
    sala_id:                     number;
    sala_nome:                   string;
    salas_fk:                    number;
}
