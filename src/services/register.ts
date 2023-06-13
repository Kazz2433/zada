import { prisma } from "@/lib/prisma"
import { PrismaUserRepository } from "@/repositories/prisma-users-repositories"
import { hash } from "bcryptjs"

interface RegisterUseCaseRequest{
    name:string,
    email:string,
    password:string
}

export class RegisterUseCase{

    constructor(private userRespository: any){}

    async execute({name,email,password,}:RegisterUseCaseRequest){
        const password_hash = await hash(password,6)
    
        const userWithSomeEmail = await prisma.user.findUnique({
            where:{
                email
            }
        })
    
        if (userWithSomeEmail){
            throw new Error('email already exists')
        }
    
        const prismaUsersRepository = new PrismaUserRepository()
    
        await prismaUsersRepository.create({
            name,
            email,
            password_hash
        })
    }

}
