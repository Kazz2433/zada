import { Checkin } from "@prisma/client";
import { ICheckinsRepository } from "@/repositories/interfaces/Icheck-ins-repository";
import { IGymsRepository } from "@/repositories/interfaces/Igyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CheckInServiceRequest{
    userId:string,
    gymId:string,
    userLatitude:number
    userLongitude:number
}

interface CheckInServiceResponse {
    checkIn:Checkin
}

export class CheckInService {
    constructor(
        private checkInsRepository:ICheckinsRepository,
        private gymsRepository:IGymsRepository
    ){}

    async execute({userId,gymId}: CheckInServiceRequest):Promise<CheckInServiceResponse>{
        const gym = await this.gymsRepository.findById(gymId)

        if (!gym){
            throw new ResourceNotFoundError()
        }
        
        const checkinOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
            userId,
            new Date(),
        )
        
        if (checkinOnSameDay){
            throw new Error()
        }

        const checkIn = await this.checkInsRepository.create({
            user_id:userId,
            gym_id:gymId
         })

        return{
            checkIn,
        }
    }
}