import { FastifyRequest,FastifyReply } from "fastify"
import { z } from "zod"
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repositories"
import { AuthenticateService } from "@/services/authenticate"
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error"

export async function authenticate(request:FastifyRequest,reply:FastifyReply){
    const authenticateBodySchema = z.object({
        email:z.string().email(),
        password:z.string().min(6)
    })

    const {email,password} = authenticateBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUserRepository() //repo
        const authenticateService = new AuthenticateService(prismaUsersRepository) //service

        await authenticateService.execute({
            email,
            password
        })
    } catch (error) {
        if(error instanceof InvalidCredentialsError){
            return reply.status(400).send({message:error.message})
        }
        return reply.status(500).send()
    }

    return reply.status(200).send()
}