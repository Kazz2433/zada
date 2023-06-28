import { GetUserMetricsService } from "../get-user-metrics"
import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-ins-repository"

export function makeGetUserMetricsService(){
    const prismaCheckInRepository = new PrismaCheckInRepository() //repo
    const service = new GetUserMetricsService(prismaCheckInRepository) //service

    return service
}