import {describe,it,expect,beforeEach} from 'vitest'
import { RegisterService } from '../register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

let usersRepository:InMemoryUsersRepository
let sut:RegisterService

describe('Register Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterService(usersRepository)
    })

    it('should be able to register', async () => {

        const {user} = await sut.execute({
            name:'Kelvin',
            email:'qwerty@gmail.com',
            password:'123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {

        const {user} = await sut.execute({
            name:'Kelvin',
            email:'qwerty@gmail.com',
            password:'123456'
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {

        const email = 'qwerty@gmail.com'

        await sut.execute({
            name:'Kelvin',
            email,
            password:'123456'
        })

        await expect(() => 
            sut.execute({
                name:'Kelvin',
                email,
                password:'123456'
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})