import {  Prisma, Checkin } from "@prisma/client";
import { ICheckinsRepository } from "../interfaces/Icheck-ins-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements ICheckinsRepository{
    public items:Checkin[] = []
    
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
