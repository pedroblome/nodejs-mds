import prismaClient from "../../prisma";
import {compare} from 'bcryptjs'
import { userInfo } from "os";
interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    //check if existe the email which is trying to make the login
    const user = await prismaClient.user.findFirst({
        where :{
            email: email
        }
    })
    if(!user){
        throw new Error("user email not found or incorrect!!")
    }
    const passwordMatch = await compare(password, user.password)
    if(!passwordMatch){
      throw new Error("password incorrect!!")
    }
    //genereate a jwt token and show id, name and user

    return { ok: true };
  }
}
export { AuthUserService };
