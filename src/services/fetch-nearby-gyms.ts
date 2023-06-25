import { Gym } from "@prisma/client"
import { IGymsRepository } from "@/repositories/interfaces/Igyms-repository"

interface FetchNearbyGymsserviceRequest{
    userLatitude:number
    userLongitude:number
}

interface FetchNearbyGymsserviceResponse{
    gyms:Gym[]
}

export class FetchNearbyGymsService{

    constructor(private gymsRepository: IGymsRepository){}

    async execute({userLatitude,userLongitude}:FetchNearbyGymsserviceRequest):Promise<FetchNearbyGymsserviceResponse>{
        const gyms = await this.gymsRepository.finManyNearby({
            latitude:userLatitude,
            longitude:userLongitude
        })

        return {
            gyms
        }
        
    }

}
