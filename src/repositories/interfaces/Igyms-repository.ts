import { Gym, Prisma } from "@prisma/client";

export interface IGymsRepository{
    findById(id:string):Promise<Gym|null>
    findMany(query:string,page:number):Promise<Gym[]>
    createGym(data:Prisma.GymCreateInput):Promise<Gym>
}