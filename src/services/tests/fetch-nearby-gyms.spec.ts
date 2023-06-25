import {describe,it,expect, beforeEach} from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsService } from '../fetch-nearby-gyms'


let gymsRepository:InMemoryGymsRepository
let sut:FetchNearbyGymsService // finalmente usando todo o serviço com dados "reais"

describe('Fetch Nearby Gyms Use Case',  () => {
    beforeEach(()=>{
        gymsRepository = new InMemoryGymsRepository()
        sut = new FetchNearbyGymsService(gymsRepository)

    })

    it('should be able to fetch nearby Gyms', async () => {
        await gymsRepository.createGym({
            title:'Near Gym',
            description:null,
            phone:null,
            latitude:-27.2092052,
            longitude:-49.6401091
        })

        await gymsRepository.createGym({
            title:'Far Gym',
            description:null,
            phone:null,
            latitude:-27.2192052,
            longitude:-49.5201091
        })
        
        const {gyms} = await sut.execute({
            userLatitude:-27.2092052,
            userLongitude:-49.6401091
        })
        
        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({title:'Near Gym'}),
        ])
    })


})