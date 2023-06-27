import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "../interfaces/Iusers-repository";

export class PrismaUserRepository implements IUsersRepository{
    async findById(id: string){
        const user = await prisma.user.findUnique({
            where:{
                id
            }
        })

        return user
    }
    async findByEmail(email: string){
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })

        return user
    }
    async createUser(data:Prisma.UserCreateInput){
        const user = await prisma.user.create({
            data
        })
        return user
    }
}