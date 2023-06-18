import { Checkin, Prisma } from "@prisma/client";

export interface ICheckinsRepository{
    create(data:Prisma.CheckinUncheckedCreateInput):Promise<Checkin>
}