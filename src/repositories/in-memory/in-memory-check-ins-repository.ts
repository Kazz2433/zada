import {  Prisma, Checkin } from "@prisma/client";
import { ICheckinsRepository } from "../interfaces/Icheck-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements ICheckinsRepository{
    public items:Checkin[] = []

    async save(checkIn: Checkin) {
        const checkInIndex = this.items.findIndex(item => item.id === checkIn.id)

        if(checkInIndex >= 0){
            this.items[checkInIndex] = checkIn
        }

        return checkIn
    }
    
    async findById(id: string){
        const checkIn = this.items.find(item => item.id === id)

        if (!checkIn) return null

        return checkIn
    }
    
    async countByUserId(userId: string){
        return this.items.filter((item) => item.user_id === userId ).length
    }


    async findManyByUserId(userId: string,page:number){
        return this.items
        .filter(item => item.user_id === userId)
        .slice((page - 1) * 20, page * 20)
    }
    
    async findByUserIdOnDate(userId: string, date: Date){
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkInUserSameDate = this.items.find((checkIn) => {
            const checkInDate = dayjs(checkIn.created_at)
            const isOnSameDay = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)
            
            
            return checkIn.user_id === userId && isOnSameDay
        })

        if (!checkInUserSameDate){
            return null
        }

        return checkInUserSameDate
    }

    
    async create(data: Prisma.CheckinUncheckedCreateInput) {
        const checkIn = {
            id:randomUUID(),
            user_id:data.user_id,
            gym_id:data.gym_id,
            validate_at:data.validate_at ? new Date(data.validate_at) : null,
            created_at: new Date()

        }

        this.items.push(checkIn)

        return checkIn
    }



}
