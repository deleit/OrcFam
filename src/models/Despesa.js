import mongoose from 'mongoose';

const despesaSchema = new mongoose.Schema({
  id: { type: String },
  descricao: { type: String, required: true },
  valor: { type: Number, required: true },
  data: { type: Date, default: Date.now }
}, { versionKey: false });

const Despesa = mongoose.model('Despesa', despesaSchema);

export default Despesa;