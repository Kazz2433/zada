import {describe,it,expect, beforeEach, vi, afterEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInService } from '../checkin'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository:InMemoryCheckInsRepository
let gymsRepository:InMemoryGymsRepository
let sut:CheckInService

describe('Check-in Use Case', () => {
    beforeEach(()=>{
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInService(checkInsRepository,gymsRepository)

        gymsRepository.items.push({
            id:'gym-01',
            title:'JavaScript Gym',
            description:'',
            phone:'',
            latitude: new Decimal(-20.5432951),
            longitude: new Decimal(-54.6424034)
        })
        
        vi.useFakeTimers()
    })

    afterEach(()=>{
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {
        const {checkIn} = await sut.execute({
            gymId:'gym-01',
            userId:'user-01',
            userLatitude:-20.5432951,
            userLongitude:-54.6424034
        })
        console.log(gymsRepository.items)
        console.log(checkIn)
        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022,0,20,8,0,0))

        await sut.execute({
            gymId:'gym-01',
            userId:'user-01',
            userLatitude:-20.5432951,
            userLongitude:-54.6424034
        })

        await expect(() => 
            sut.execute({
                gymId:'gym-01',
                userId:'user-01',
                userLatitude:-20.5432951,
                userLongitude:-54.6424034
            }),
        ).rejects.toBeInstanceOf(Error)
    })


    it('should be able to check in twice but in the different days', async () => {
        vi.setSystemTime(new Date(2022,0,20,8,0,0))

        await sut.execute({
            gymId:'gym-01',
            userId:'user-01',
            userLatitude:-20.5432951,
            userLongitude:-54.6424034
        })

        vi.setSystemTime(new Date(2022,0,21,8,0,0))

        const {checkIn} = await sut.execute({
            gymId:'gym-01',
            userId:'user-01',
            userLatitude:-20.5432951,
            userLongitude:-54.6424034
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in on distant gym', async () => {
        gymsRepository.items.push({
            id:'gym-02',
            title:'JavaScript Gym',
            description:'',
            phone:'',
            latitude: new Decimal(-20.5091716),
            longitude: new Decimal(-54.585152)
            
        })
        
        await expect(()=> sut.execute({
            gymId:'gym-02',
            userId:'user-01',
            userLatitude:-20.5432951,
            userLongitude:-54.6424034

            })
        ).rejects.toBeInstanceOf(Error)
    })
})