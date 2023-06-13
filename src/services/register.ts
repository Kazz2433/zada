export function registerUseCase(){
    const password_hash = await hash(password,6)

    const userWithSomeEmail = await prisma.user.findUnique({
        where:{
            email
        }
    })

    if (userWithSomeEmail){
        return reply.status(409).send()
    }

    await prisma.user.create({
        data:{
            name,
            email,
            password_hash
        }
    })
}