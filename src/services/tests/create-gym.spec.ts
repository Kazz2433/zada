import {describe,it,expect,beforeEach} from 'vitest'
import { RegisterService } from '../register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymService } from '../create-gym'

let gymsRepository:InMemoryGymsRepository
let sut:CreateGymService

describe('Create Gym Use Case', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymService(gymsRepository)
    })

    it('should be able to create a gym', async () => {

        const {gym} = await sut.execute({
            title:'JavaScript Gym',
            description:'null',
            phone:null,
            latitude:-27.2092052,
            longitude:-49.6401091
        })

        expect(gym.id).toEqual(expect.any(String))
    })

})