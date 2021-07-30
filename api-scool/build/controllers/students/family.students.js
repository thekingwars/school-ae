"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.momInformation = exports.dadInformation = void 0;

var _db = _interopRequireDefault(require("../../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dadInformation = async (req, res) => {
  const {
    aluno_pai_nome,
    aluno_pai_contacto,
    aluno_pai_email,
    aluno_pai_habilitacao,
    aluno_pai_formacao,
    aluno_pai_profissao
  } = req.body;
  const {
    id
  } = req.params;
  let query = `UPDATE alunos SET ? WHERE aluno_id = ?`;
  let data = {
    aluno_pai_nome,
    aluno_pai_contacto,
    aluno_pai_email,
    aluno_pai_habilitacao,
    aluno_pai_formacao,
    aluno_pai_profissao
  };
  let dad = await _db.default.query(query, [data, id]);
  console.log(dad);
  return res.status(201).json({
    ok: true,
    student: dad
  });
};

exports.dadInformation = dadInformation;

const momInformation = async (req, res) => {
  const {
    aluno_mae_nome,
    aluno_mae_contacto,
    aluno_mae_email,
    aluno_mae_habilitacao,
    aluno_mae_formacao,
    aluno_mae_profissao
  } = req.body;
  const {
    id
  } = req.params;
  let query = `UPDATE alunos SET ? WHERE aluno_id = ?`;
  let data = {
    aluno_mae_nome,
    aluno_mae_contacto,
    aluno_mae_email,
    aluno_mae_habilitacao,
    aluno_mae_formacao,
    aluno_mae_profissao
  };
  let mom = await _db.default.query(query, [data, id]);
  return res.status(201).json({
    ok: true,
    student: mom
  });
};

exports.momInformation = momInformation;