import {Request, Response} from 'express'
import { CreateCategoryService } from "../../services/category/CreateCategoryService"


class CreateCategoryController{
    const

    async handle(req: Request, res: Response){
        
        const {name} = req.body
        const createCategoryService = new CreateCategoryService();

        const category = await createCategoryService.execute({
            name
        });

        return res.json(category);

        
    }

}
export { CreateCategoryController}