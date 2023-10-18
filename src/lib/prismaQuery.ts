import { prisma } from '@/lib/prismaInit';



export function extractUserById(id:number){
    return prisma.user.findFirst({
        where:{
            id: id
        }
    });
}