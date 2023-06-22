import { Gym, Prisma } from "@prisma/client";

export interface IGymsRepository{
    findById(id:string):Promise<Gym|null>
    createGym(data:Prisma.GymCreateInput):Promise<Gym>
}