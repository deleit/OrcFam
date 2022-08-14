import mongoose from 'mongoose';

const despesaSchema = new mongoose.Schema(
  {
    id: { type: String },
    descricao: { type: String, required: true },
    valor: { type: Number, required: true },
    data: { type: Date, default: Date.now },
    categoria: { type: mongoose.Types.ObjectId, ref: 'Categoria', default: '62f1404215e3c153c95efe9a' }
  },
  {
    query: {
      byDescricao(descricao) {
        return this.where({ descricao: new RegExp(descricao, 'iu') })
      }
    }
  },
  {
    versionKey: false
  }
);

const Despesa = mongoose.model('Despesa', despesaSchema);

export default Despesa;