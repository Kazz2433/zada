import {describe,it,expect} from 'vitest'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'


describe('Authenticate Use Case', () => {

    it('should be able to authenticate', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const authenticateService = new AuthenticateService(usersRepository)

        await usersRepository.createUser({
            name:'kelvin',
            email:'qwerty@gmail.com',
            password_hash: await hash('123456',6)
        })

        const {user} = await authenticateService.execute({
            email:'qwerty@gmail.com',
            password:'123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const authenticateService = new AuthenticateService(usersRepository)

        expect(() => authenticateService.execute({
            email:'qwerty@gmail.com',
            password:'123456'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong pass', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const authenticateService = new AuthenticateService(usersRepository)


        await usersRepository.createUser({
            name:'kelvin',
            email:'qwerty@gmail.com',
            password_hash: await hash('123456',6)
        })


        expect(() => authenticateService.execute({
            email:'qwerty@gmail.com',
            password:'1234567'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })



})