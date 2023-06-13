import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { IUsersRepository } from "../users-repository";

export class PrismaUserRepository implements IUsersRepository{
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