import {describe,it,expect, beforeEach} from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from '../authenticate'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let usersRepository:InMemoryUsersRepository
let sut:AuthenticateService

describe('Authenticate Use Case', () => {
    beforeEach(()=>{
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateService(usersRepository)
    })

    it('should be able to authenticate', async () => {
        await usersRepository.createUser({
            name:'kelvin',
            email:'qwerty@gmail.com',
            password_hash: await hash('123456',6)
        })

        const {user} = await sut.execute({
            email:'qwerty@gmail.com',
            password:'123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        await expect(() => sut.execute({
            email:'qwerty@gmail.com',
            password:'123456'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong pass', async () => {
        await expect(() => sut.execute({
            email:'qwerty@gmail.com',
            password:'1234567'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })



})