import { Gym } from "@prisma/client"
import { IGymsRepository } from "@/repositories/interfaces/Igyms-repository"

interface CreateGymServiceRequest{
    title:string
    description: string | null
    phone: string | null
    latitude:number
    longitude:number
}

interface CreateGymServiceResponse{
    gym:Gym
}

export class CreateGymService{

    constructor(private gymsRespository: IGymsRepository){}

    async execute({title,description,phone,latitude,longitude}:CreateGymServiceRequest):Promise<CreateGymServiceResponse>{
        const gym = await this.gymsRespository.createGym({
            title,
            description,
            phone,
            latitude,
            longitude
        })

        return {
            gym
        }
        
    }

}
