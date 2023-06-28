import { FetchUsersCheckInsService } from "../fetch-user-check-ins"
import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-ins-repository"

export function makeFetchUsersCheckInsService(){
    const prismaCheckInRepository = new PrismaCheckInRepository() 
    const service = new FetchUsersCheckInsService(prismaCheckInRepository)
    return service
}