import {describe,it,expect, beforeEach} from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchGymService } from '../fetch-gyms'


let gymsRepository:InMemoryGymsRepository
let sut:FetchGymService // finalmente usando todo o serviço com dados "reais"

describe('Fetch Gyms Use Case',  () => {
    beforeEach(()=>{
        gymsRepository = new InMemoryGymsRepository()
        sut = new FetchGymService(gymsRepository)

    })

    it('should be able to fetch Gyms', async () => {
        await gymsRepository.createGym({
            title:'JavaScript Gym',
            description:null,
            phone:null,
            latitude:-27.2092052,
            longitude:-49.6401091
        })

        await gymsRepository.createGym({
            title:'TypeScript Gym',
            description:null,
            phone:null,
            latitude:-27.2092052,
            longitude:-49.6401091
        })
        
        const {gyms} = await sut.execute({
            query:'JavaScript',
            page:1
        })
        
        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({title:'JavaScript Gym'}),
        ])
    })

    it('should be able to fetch paginated gyms search', async () => {
        for (let i = 1;i <= 22;i++) {
            await gymsRepository.createGym({
                title:`TypeScript Gym ${i}`,
                description:null,
                phone:null,
                latitude:-27.2092052,
                longitude:-49.6401091
            })        
        }        
        
        const {gyms} = await sut.execute({
            query:'TypeScript',
            page:2
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({title:'TypeScript Gym 21'}),
            expect.objectContaining({title:'TypeScript Gym 22'})
        ])
    })


})