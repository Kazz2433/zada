import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repositories"
import { RegisterService } from "../register"

export function makeRegisterService(){
    const prismaUsersRepository = new PrismaUserRepository() //repo
    const registerService = new RegisterService(prismaUsersRepository) //service

    return registerService
}