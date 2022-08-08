import Categoria from "../models/Categoria.js";

class CategoriaController {
    static listaCategorias = (req, res) => {
        Categoria.find((err, categorias) => {
            if (err)
                res.status(500).send({ error: `Falha ao listar categorias: ${err.message}` });
            else
                res.status(200).json(categorias);
        });
    }

    static listaCategoriasPorId = (req, res) => {
        let id = req.params.id;

        Categoria.findById(id, (err, categoria) => {
            if (err)
                res.status(400).send({ error: `ID de receita não localizada: ${err.message}` });
            else
                res.status(200).json(categoria);
        });
    }
}

export default CategoriaController;