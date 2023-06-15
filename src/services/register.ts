import { prisma } from "@/lib/prisma"
import { IUsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

interface RegisterUseCaseRequest{
    name:string,
    email:string,
    password:string
}

export class RegisterUseCase{

    constructor(private userRespository: IUsersRepository){}

    async execute({name,email,password,}:RegisterUseCaseRequest){
        const password_hash = await hash(password,6)
    
        const userWithSomeEmail = await this.userRespository.findByEmail(email)

        if (userWithSomeEmail){
            throw new UserAlreadyExistsError()
        }
    
        await this.userRespository.createUser({
            name,
            email,
            password_hash
        })
    }

}
