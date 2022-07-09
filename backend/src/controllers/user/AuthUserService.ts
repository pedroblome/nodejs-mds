import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { userInfo } from "os";
import { sign } from "jsonwebtoken";
interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    //check if existe the email which is trying to make the login
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new Error("user email not found or incorrect!!");
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("password incorrect!!");
    }
    //genereate a jwt token and show id, name and user
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.name,
      token: token,
    };
  }
}
export { AuthUserService };
