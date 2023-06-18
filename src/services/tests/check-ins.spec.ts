import {describe,it,expect, beforeEach} from 'vitest'
import { hash } from 'bcryptjs'
import { GetUserProfileService } from '../get-user-profile'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInService } from '../checkin'

let checkInsRepository:InMemoryCheckInsRepository
let sut:CheckInService

describe('Authenticate Use Case', () => {
    beforeEach(()=>{
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new CheckInService(checkInsRepository)
    })

    it('should be able to check in', async () => {
        const {checkIn} = await sut.execute({
            gymId:'gym-01',
            userId:'user-01'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

})