import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repositories"
import { GetUserProfileService } from "../get-user-profile"

export function makeGetUserProfileService(){
    const prismaUsersRepository = new PrismaUserRepository() //repo
    const service = new GetUserProfileService(prismaUsersRepository) //service

    return service
}