import { IUsersRepository } from "@/repositories/interfaces/Iusers-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { User } from "@prisma/client"

interface RegisterServiceRequest{
    name:string,
    email:string,
    password:string
}

interface RegisterServiceResponse{
    user:User
}

export class RegisterService{

    constructor(private userRespository: IUsersRepository){}

    async execute({name,email,password,}:RegisterServiceRequest):Promise<RegisterServiceResponse>{
        const password_hash = await hash(password,6)
    
        const userWithSomeEmail = await this.userRespository.findByEmail(email)

        if (userWithSomeEmail){
            throw new UserAlreadyExistsError()
        }
    
        const user = await this.userRespository.createUser({
            name,
            email,
            password_hash
        })

        return {
            user,
        }
    }

}
