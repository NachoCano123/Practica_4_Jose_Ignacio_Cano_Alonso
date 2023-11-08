import mongoose from "npm:mongoose@7.6.3"
import { Coche, TIPOS } from "./TIPOS.ts";

const Schema = mongoose.Schema

const esquemacoche = new Schema({
    marca: {type: String, required: true, unique: true},
    tipo: {type: String, enum:TIPOS, required: true},
    coste: {type: Number, required: true},
}, {
    timestamps: true,
})

export type cocheMode1Type = mongoose.Document & Omit<Coche, "id">

export const cocheMode1Type = mongoose.model<cocheMode1Type>(
    "Coches", esquemacoche //Para que otros esquemas identifiquen este esquema
)