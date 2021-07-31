export interface Livros{
    livros: JSONLivros
}

export interface JSONLivros {
    estado_livro_fk:   number;
    livro_ano_edicao:  Date;
    livro_editora:     string;
    livro_gr_etario:   string;
    livro_id:          number;
    livro_isbn:        string;
    livro_lingua:      string;
    livro_nivel:       string;
    livro_nome:        string;
    livro_programa:    string;
    livro_valor_venda: string;
}