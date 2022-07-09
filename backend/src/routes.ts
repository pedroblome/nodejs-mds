import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";

const router = Router();

// -- user routes --
router.post("/users", new CreateUserController().handle);

export { router };
