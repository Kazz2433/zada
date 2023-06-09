import { User, Prisma } from "@prisma/client";
import { IUsersRepository } from "../interfaces/Iusers-repository";
import { randomUUID } from "crypto";

export class InMemoryUsersRepository implements IUsersRepository{
    public items:User[] = []
    
    async findById(id: string): Promise<User | null> {
        const user = this.items.find((item) => item.id === id)

        if(!user){
            return null
        }

        return user
    }

    async findByEmail(email: string)  {
        const user = this.items.find((item) => item.email === email)

        if(!user){
            return null
        }

        return user
    }
    async createUser(data: Prisma.UserCreateInput) {
        const user = {
            id:randomUUID(),
            name:data.name,
            email:data.email,
            password_hash:data.password_hash,
            created_at: new Date(),
        }

        this.items.push(user)

        return user
    }

}
