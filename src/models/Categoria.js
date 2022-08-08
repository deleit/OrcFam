import mongoose from 'mongoose';

const categoriaSchema = new mongoose.Schema({
    id: { type: String },
    categoria: { type: String, required: true }
}, { versionKey: false });

const Categoria = mongoose.model('Categoria', categoriaSchema);

export default Categoria;