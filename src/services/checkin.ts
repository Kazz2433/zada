import { Checkin } from "@prisma/client";
import { ICheckinsRepository } from "@/repositories/interfaces/Icheck-ins-repository";

interface CheckInServiceRequest{
    userId:string,
    gymId:string
}

interface CheckInServiceResponse {
    checkIn:Checkin
}

export class CheckInService {
    constructor(private checkInsRepository:ICheckinsRepository){}

    async execute({userId,gymId}: CheckInServiceRequest):Promise<CheckInServiceResponse>{
         const checkIn = await this.checkInsRepository.create({
            user_id:userId,
            gym_id:gymId
         })

        return{
            checkIn,
        }
    }
}