import { Gym, Prisma } from "@prisma/client";

export interface FindManyParams{
    latitude:number
    longitude:number
}

export interface IGymsRepository{
    findById(id:string):Promise<Gym|null>
    findMany(query:string,page:number):Promise<Gym[]>
    finManyNearby(params:FindManyParams):Promise<Gym[]>
    createGym(data:Prisma.GymCreateInput):Promise<Gym>
}