import mongoose from "npm:mongoose@7.6.3"

export enum TIPOS
{
    Familiar, Todoterreno, Uniplaza, electrico
}

export type Coche = {
    marca: string,
    tipo: TIPOS,
    coste: number,
}

export type Concesionario = {
    nombre: string,
    numcoches: number,
    ciudad: string,
    nombregerente: string,
    coches: string[], //Array de strings con id(los id de los coches)
}

export type Cliente = {
    nombre: string,
    genero: string,
    saldo: number,
    DNI: string,
    coches: string[], 
}