//@ts-ignore
import express, {Request, Response} from "npm:express@4.18.2"
import mongoose from "npm:mongoose@7.6.3"
import { clienteMode1Type } from "./cliente.ts"

export const addcliente = async(req:Request, res:Response) => {
    try
    {
    const {nombre, genero, saldo, DNI} = req.body 

    if(!nombre || !genero || !saldo || !DNI){
        res.status(500).send("Missing data")
        return
    }

    if(typeof nombre !== "string" || typeof genero !== "string" || typeof saldo !== "number" || typeof DNI !== "string")
    {
        res.status(500).send("Invalid data type")
        return
    }

    const exists = await clienteMode1Type.findOne({DNI}).exec()
    if(exists){
        res.status(400).send("Este DNI ya existe")
        return
    }

    const char = await clienteMode1Type.create({
        nombre,
        genero,
        saldo,
        DNI,
    })

    res.send({
        nombre,
        genero,
        saldo,
        DNI,
        id: char.id,
    })
}
catch(e)
{
    res.status(500).send(e)
}
}

export const verclientes = async(req:Request, res:Response) => {
    try 
    {
        const ID = new mongoose.Types.ObjectId(req.params.ID) //cambiar de string a objectID
        const resultado = await clienteMode1Type.find({_id: ID}).exec()
        res.send(JSON.stringify(resultado))
    } catch (e) {
        res.status(404).send("ID no valido")
    }
}

export const anadirdinero = async(req:Request, res:Response) => {
    try {
        const ID = req.params.id
        const saldonuevo = req.params.saldo //nuevo saldo

        const micliente = await clienteMode1Type.findOne({id: ID})
        let saldoactual = micliente?.saldo
        if(saldoactual===undefined) //Para que no nos de el error del undefined
        {
            saldoactual=0;
        }

        if(saldonuevo<=saldoactual)
        {
            
            res.status(450).send("El saldo no puede ser menor o igual al saldo anterior")
        }
        else
        {
            const Update= await clienteMode1Type.findOneAndUpdate({id: ID},{saldo: req.params.saldo})
            res.send(JSON.stringify(Update));
        }
        
    } catch (e) {
        res.status(404).send("ID no valido")
    }
}