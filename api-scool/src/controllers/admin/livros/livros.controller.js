import db from '../../../db';

let livros
export const createLivros = async(req, res) => {
    const { livro_isbn, livro_nome, livro_editora, livro_ano_edicao, livro_programa, livro_gr_etario, livro_lingua, livro_nivel, estado_livro_fk, livro_valor_venda } = req.body

    let sql = `INSERT INTO livros SET ?`
    let livro_isbnUnique = `SELECT * FROM livros WHERE livro_isbn = ?`
    const data = {
        livro_isbn,
        livro_nome,
        livro_editora,
        livro_ano_edicao,
        livro_programa,
        livro_gr_etario,
        livro_lingua,
        livro_nivel,
        estado_livro_fk,
        livro_valor_venda
    }

    const livro_isbnTable = await addSql(livro_isbnUnique, livro_isbn)

    if (livro_isbnTable.length > 0) {
        if (livro_isbnTable[0].livro_isbn === livro_isbn) {
            return res.status(406).json({ ok: false, err: 'O isbn é único, não pode ser repetido' });
        }
    }

    if (!livro_isbn || !livro_nome || !livro_editora || !livro_ano_edicao || !livro_programa || !livro_gr_etario || !livro_lingua || !livro_nivel || !estado_livro_fk || !livro_valor_venda) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' });
    }

    livros = await addSql(sql, data)

    return res.status(201).json({ ok: true, livros: await id(livros.insertId) });
}

export const findAllLivros = async(req, res) => {
    let sql = ` SELECT a1.*, b1.estado_livro_nome
        	    FROM livros a1 JOIN estado_livros b1 ON a1.estado_livro_fk = b1.estado_livro_id
                ORDER BY livro_id`;

    let sqlextra = `SELECT * FROM livros`

    livros = await addSql(sql);

    return res.status(200).json({ ok: true, livros });
}

export const findLivros = async(req, res) => {
    const { id } = req.params;
    let sql = ` SELECT a1.*, b1.estado_livro_nome
        	    FROM livros a1 JOIN estado_livros b1 ON a1.estado_livro_fk = b1.estado_livro_id
                WHERE livro_id = ?`;

    livros = await addSql(sql, id);
    return res.status(200).json({ ok: true, livros: livros[0] });
}

export const updateLivros = async(req, res) => {
    const { livro_nome, livro_editora, livro_ano_edicao, livro_programa, livro_gr_etario, livro_lingua, livro_nivel, estado_livro_fk, livro_valor_venda } = req.body

    let sql = 'UPDATE livros SET ? WHERE livro_id = ?';
    const data = {
        livro_nome,
        livro_editora,
        livro_ano_edicao,
        livro_programa,
        livro_gr_etario,
        livro_lingua,
        livro_nivel,
        estado_livro_fk,
        livro_valor_venda
    }


    if (!livro_nome || !livro_editora || !livro_ano_edicao || !livro_programa || !livro_gr_etario || !livro_lingua || !livro_nivel || !estado_livro_fk || !livro_valor_venda) {
        return res.status(400).json({ ok: false, err: 'Campos obrigatórios' });
    }

    livros = await addSql(sql, [data, req.params.id]);

    return res.status(201).json({ ok: true, livros: await id(req.params.id) });
}

export const deleteLivros = async(req, res) => {
    let sql = 'DELETE FROM livros WHERE livro_id = ?';
    livros = await addSql(sql, req.params.id);
    return res.status(201).json({ ok: true, livros: 'Livro removido com êxito' });
}


//funciones de optimizacion
const addSql = async(sql, data) => {
    return await db.query(sql, data);
}

const id = async(id) => {
    let sql = 'SELECT * FROM  livros WHERE livro_id = ?';
    livros = await addSql(sql, [id]);
    return livros;
}