import {describe,it,expect, beforeEach} from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileService } from '../get-user-profile'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let usersRepository:InMemoryUsersRepository
let sut:GetUserProfileService

describe('Authenticate Use Case', () => {
    beforeEach(()=>{
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileService(usersRepository)
    })

    it('should be able to get user profile', async () => {
        const createdUser = await usersRepository.createUser({
            name:'kelvin',
            email:'qwerty@gmail.com',
            password_hash: await hash('123456',6)
        })

        const {user} = await sut.execute({
            userId: createdUser.id
        })

        expect(user.name).toEqual('kelvin')
    })

    it('should not be able to get user profile with wrong id', () => {
        expect(async ()=>{
            await sut.execute({
                userId: 'user without id'
            })
        }).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

})