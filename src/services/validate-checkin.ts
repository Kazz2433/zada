import { Checkin } from "@prisma/client";
import { ICheckinsRepository } from "@/repositories/interfaces/Icheck-ins-repository";
import { IGymsRepository } from "@/repositories/interfaces/Igyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";

interface ValidateCheckInServiceRequest{
    checkInId:string
}

interface ValidateCheckInServiceResponse {
    checkIn:Checkin
}

export class ValidateCheckInService {
    constructor(
        private checkInsRepository:ICheckinsRepository,
    ){}

    async execute({checkInId}: ValidateCheckInServiceRequest):Promise<ValidateCheckInServiceResponse>{
        const checkIn = await this.checkInsRepository.findById(checkInId)

        if (!checkIn) throw new ResourceNotFoundError()

        checkIn.validate_at = new Date()

        await this.checkInsRepository.save(checkIn)

        return{
            checkIn,
        }
    }
}