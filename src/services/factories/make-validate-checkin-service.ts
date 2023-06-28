import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { ValidateCheckInService } from "../validate-checkin"

export function makeValidateCheckInService(){
    const prismaCheckInRepository = new PrismaCheckInRepository() 
    const service = new ValidateCheckInService(prismaCheckInRepository)
    return service
}