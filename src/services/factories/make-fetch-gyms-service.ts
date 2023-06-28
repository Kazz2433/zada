import { FetchGymService } from "../fetch-gyms"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"

export function makeFetchGymService(){
    const prismaGymsRepository = new PrismaGymsRepository() 
    const service = new FetchGymService(prismaGymsRepository)
    return service
}