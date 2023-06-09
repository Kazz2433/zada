import { Checkin } from "@prisma/client";
import { ICheckinsRepository } from "@/repositories/interfaces/Icheck-ins-repository";
import { IGymsRepository } from "@/repositories/interfaces/Igyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";

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

    async execute({userId,gymId,userLatitude,userLongitude}: CheckInServiceRequest):Promise<CheckInServiceResponse>{
        const gym = await this.gymsRepository.findById(gymId)

        if (!gym){
            throw new ResourceNotFoundError()
        }

        const distance = getDistanceBetweenCoordinates(
            {latitude: userLatitude,longitude:userLongitude},
            {
                latitude:gym.latitude.toNumber(),
                longitude:gym.longitude.toNumber()
            }
        )

        const MAX_DISTANCE_IN_KILOMETERS = 0.1
        
        if(distance > MAX_DISTANCE_IN_KILOMETERS){
            throw new MaxDistanceError()
        }

        const checkinOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
            userId,
            new Date(),
        )
        
        if (checkinOnSameDay){
            throw new MaxNumberOfCheckInsError()
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