  
export interface Students{
  student: JsonStudent
}

export interface JsonStudent{
  aluno_id:                            number;
  aluno_foto:                          string;
  aluno_nome:                          string;
  aluno_idad:                          number;
  aluno_nacionalidade:                 string;
  aluno_tipo_doc_ident:                string;
  aluno_num_doc_ident:                 number;
  aluno_data_nascimento:               Date;
  aluno_nif:                           null;
  aluno_rua:                           null;
  aluno_codigo_postal:                 null;
  aluno_freguesia:                     null;
  aluno_concelho:                      null;
  aluno_telemovel:                     string;
  aluno_escola_publica:                string;
  aluno_pai_nome:                      string;
  aluno_pai_contacto:                  number;
  aluno_pai_email:                     string;
  aluno_mae_nome:                      string;
  aluno_mae_contacto:                  number;
  aluno_mae_email:                     string;
  aluno_sexo:                          string;
  aluno_habilitacao:                   string;
  aluno_formacao:                      string;
  aluno_profissao:                     null;
  aluno_pai_habilitacao:               string;
  aluno_pai_formacao:                  string;
  aluno_pai_profissao:                 string;
  aluno_mae_habilitacao:               string;
  aluno_mae_formacao:                  string;
  aluno_mae_profissao:                 string;
  aluno_enc_edu_grau_parentesco:       null;
  aluno_enc_edu_nome:                  null;
  aluno_enc_edu_telefone:              null;
  aluno_enc_edu_email:                 null;
  aluno_obs:                           null;
  aluno_estado:                        null;
  nacionalidades_nacionalidades_id:    null;
  escolas_publica_Escolas_publicas_id: null;
  tipo_doc_ident_tipo_doc_ident_id:    null;
  freguesias_freguesias_id:            null;
  codigo:                              null;
  postal_codigo:                       null;
  postal_id:                           null;
  concelho_concelho_id:                null;
  sexo_sexo_id:                        null;
  habilitacao_habiltacao_id:           null;
  formacao_formacao_id:                null;
  profissao_profissao_id:              null;
  grau_parentesco_grau_parentesco_id:  null;
  estado_dados_estado_dado_id:         null;
  utilizador_fk:                       null;
  Diplomas_diplomas_id:                null;
  aluno_email:                         string;
  aluno_password:                      string;
}