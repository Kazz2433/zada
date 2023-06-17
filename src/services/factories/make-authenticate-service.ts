import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repositories"
import { AuthenticateService } from "../authenticate"

export function makeAuthenticateService(){
    const prismaUsersRepository = new PrismaUserRepository() //repo
    const authenticateService = new AuthenticateService(prismaUsersRepository) //service

    return authenticateService
}