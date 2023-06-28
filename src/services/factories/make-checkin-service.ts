import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CheckInService } from "../checkin"
import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-ins-repository"

export function makeCheckInService(){
    const prismaCheckInRepository = new PrismaCheckInRepository() 
    const gymsRepository = new PrismaGymsRepository()
    const service = new CheckInService(prismaCheckInRepository,gymsRepository) 

    return service
}