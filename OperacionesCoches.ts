//@ts-ignore
import express, {Request, Response} from "npm:express@4.18.2" //https://www.npmjs.com/package/express
import mongoose from "npm:mongoose@7.6.3"
import { TIPOS } from "./TIPOS.ts";
import { cocheMode1Type } from "./coche.ts";

export const addCoche = async(req:Request, res:Response) => {
    try
    {
    const {marca, tipo, coste} = req.body 

    if(!marca || !tipo || !coste){
        res.status(500).send("Missing data")
        return
    }

    if(!Object.values(TIPOS).includes(tipo)) //Si incluye una raza distintas a las de la enum RAZAS
    {
        res.status(500).send("tipo no encontrado")
        return
    }

    if(typeof marca !== "string" || typeof tipo !== "string" || typeof coste !== "number")
    {
        res.status(500).send("Invalid data type")
        return
    }

    const char = await cocheMode1Type.create({
        marca,
        tipo,
        coste
    })

    res.send({
        marca,
        tipo,
        coste,
        id: char.id,
    })
}
catch(e)
{
    res.status(500).send(e)
}
}

export const vercoches = async(req:Request, res:Response) => {
    try 
    {
        const ID = new mongoose.Types.ObjectId(req.params.ID) //cambiar de string a objectID
        const resultado = await cocheMode1Type.find({_id: ID}).exec()
        res.send(JSON.stringify(resultado))
    } catch (e) {
        res.status(404).send("ID no valido")
    }
}