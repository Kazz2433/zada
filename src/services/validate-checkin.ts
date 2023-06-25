import { Checkin } from "@prisma/client";
import { ICheckinsRepository } from "@/repositories/interfaces/Icheck-ins-repository";
import { IGymsRepository } from "@/repositories/interfaces/Igyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import dayjs from "dayjs";
import { LateCheckInValidateError } from "./errors/late-check-in-validate-error";

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

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            "minutes"
        )

        if (distanceInMinutesFromCheckInCreation > 20){
            throw new LateCheckInValidateError()
        }

        checkIn.validate_at = new Date()

        await this.checkInsRepository.save(checkIn)

        return{
            checkIn,
        }
    }
}