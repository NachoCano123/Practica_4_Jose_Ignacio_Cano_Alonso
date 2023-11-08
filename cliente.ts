import mongoose from "npm:mongoose@7.6.3"
import { Cliente } from "./TIPOS.ts"

const Schema = mongoose.Schema

const esquemacliente = new Schema({
    nombre: {type: String, required: true},
    genero: {type: String, required: true},
    saldo: {type: Number, required: true},
    DNI: {type: String, required: true, unique: true},
    coches: {type:Array<String>, requitred:true}, //Este tiene que ser un array de string que contengan id de coches
}, {
    timestamps: true,
})

export type clienteMode1Type = mongoose.Document & Omit<Cliente, "id">

export const clienteMode1Type = mongoose.model<clienteMode1Type>(
    "Clientes", esquemacliente //Para que otros esquemas identifiquen este esquema
)