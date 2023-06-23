import { Checkin } from "@prisma/client";
import { ICheckinsRepository } from "@/repositories/interfaces/Icheck-ins-repository";

interface FetchUsersCheckInsServiceRequest{
    userId:string,
    page:number

}

interface FetchUsersCheckInsServiceResponse {
    checkIns:Checkin[]
}

export class FetchUsersCheckInsService {
    constructor(
        private checkInsRepository:ICheckinsRepository,
    ){}

    async execute({userId,page }: FetchUsersCheckInsServiceRequest):Promise<FetchUsersCheckInsServiceResponse>{
        const checkIns = await this.checkInsRepository.findManyByUserId(userId,page)

        return{
            checkIns,
        }
    }
}