import { Gym } from "@prisma/client"
import { IGymsRepository } from "@/repositories/interfaces/Igyms-repository"

interface FetchGymserviceRequest{
    query:string
    page:number
}

interface FetchGymserviceResponse{
    gyms:Gym[]
}

export class FetchGymService{

    constructor(private gymsRepository: IGymsRepository){}

    async execute({query,page}:FetchGymserviceRequest):Promise<FetchGymserviceResponse>{
        const gyms = await this.gymsRepository.findMany(query,page)

        return {
            gyms
        }
        
    }

}
