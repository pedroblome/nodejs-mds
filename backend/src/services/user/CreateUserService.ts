import { triggerAsyncId } from 'async_hooks';
import prismaClient from '../../prisma'
import {hash} from 'bcryptjs'

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    
    //validation in request body
    const userAlreadyExists = await prismaClient.user.findFirst({
        where:{
            email: email
        }
    })

    if(!email){
        throw new Error("email incorrect!!")
    }
    if(userAlreadyExists){
        throw new Error("email is already in use!!")
    }

    const passwordHash = await hash(password,8)

    const user = await prismaClient.user.create({
        data: {
            name: name,
            email:email,
            password: passwordHash
        },
        select:{
            id:true,
            name: true,
            email: true
        }
    })

    return user
  }
}

export { CreateUserService };
