import Despesa from "../models/Despesa.js";

class DespesaController {
  static listaDespesas = (req, res) => {
    if (req.query.descricao) {
      Despesa
        .find()
        .byDescricao(req.query.descricao)
        .populate('categoria', '-_id')
        .exec((err, despesa) => {
          if (err)
            res.status(400).send({ error: `ID de despesa não localizada: ${err.message}` });
          else
            res.status(200).json(despesa);
        });
    } else {
      Despesa
        .find()
        .populate('categoria', '-_id')
        .exec((err, despesas) => {
          if (err)
            res.status(500).send({ error: `Falha ao listar despesas: ${err.message}` });
          else
            res.status(200).json(despesas)
        });
    }
  }

  static listaDespesaPorId = (req, res) => {
    let id = req.params.id;

    Despesa
      .findById(id)
      .populate('categoria', '-_id')
      .exec((err, despesa) => {
        if (err)
          res.status(400).send({ error: `ID de despesa não localizada: ${err.message}` });
        else
          res.status(200).json(despesa);
      });
  }

  static cadastraDespesa = (req, res) => {
    let data = new Date(req.body.data);
    let primeiroDiaDoMes = new Date(data.getFullYear(), data.getMonth(), 1);
    let ultimoDiaDoMes = new Date(data.getFullYear(), data.getMonth() + 1, 0);

    Despesa.find({
      descricao: req.body.descricao,
      data: {
        $gte: new Date(primeiroDiaDoMes),
        $lt: new Date(ultimoDiaDoMes)
      }
    }, {}, (error, despesas) => {
      if (error) {
        res.status(500).send({ error: `Falha ao cadastrar: ${error.message}` });
      } else if (despesas.length === 0) {
        let despesa = new Despesa(req.body);
        despesa.save((err) => {
          if (err) {
            res.status(500).send({ error: `Falha ao cadastrar despesa: ${err.message}` });
          } else {
            res.status(201).send(despesa.toJSON());
          }
        });
      } else {
        res.status(500).send({ error: 'Falha ao cadastrar despesa: duplicada' });
      }
    });
  }

  static atualizaDespesa = (req, res) => {
    let id = req.params.id;

    Despesa.findById(id, (err, despesa) => {
      let data = new Date(req.body.data || despesa.data);
      let primeiroDiaDoMes = new Date(data.getFullYear(), data.getMonth(), 1);
      let ultimoDiaDoMes = new Date(data.getFullYear(), data.getMonth() + 1, 0);

      Despesa.find({
        descricao: req.body.descricao || despesa.descricao,
        data: {
          $gte: new Date(primeiroDiaDoMes),
          $lt: new Date(ultimoDiaDoMes)
        }
      }, {}, (error, despesas) => {
        if (error)
          res.status(500).send({ error: `Falha ao editar despesa: ${error.message}` });
        else if (despesas.length === 0) {
          Despesa.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (err)
              res.status(500).send({ error: `Falha ao editar despesa: ${error.message}` });
            else
              res.status(200).send({ message: 'Despesa atualizada com sucesso!' });
          });
        } else {
          res.status(500).send({ error: 'Falha ao editar despesa: duplicada' });
        }
      });
    });
  }

  static excluiDespesa = (req, res) => {
    let id = req.params.id;

    Despesa.findByIdAndRemove(id, (err) => {
      if (err)
        res.status(500).send({ error: `Não foi possível excluir a receita: ${err.message}` })
      else
        res.status(200).send({ message: 'Receita excluída com sucesso!' });
    });
  }
}

export default DespesaController;