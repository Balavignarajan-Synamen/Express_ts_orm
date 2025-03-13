import { Request, Response } from "express";
import User from "../models/userModel";

//Create
export const createUser = async (
req: Request,
res: Response,
): Promise<void> => {
    const {name, email, password} = req.body;
      try {
        const user = await User.create({name, email, password });
        res.status(201).json(user);
      }catch (err: any) {
        res.status(500).json({message: err.message});
      }
};

//Get
export const getUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    }catch (err: any){
        res.status(500).json({message: err.message});
    }
};

//Get By Id
export const getUser = async (req: Request, res:Response): Promise<void> => {
    try{
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        }else {
            res.status(400).json({message : "user not found"});
        }
    }catch (err: any){
        res.status(500).json({message: err.message});
    }
};

//update
export const updateUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const [updated] = await User.update(req.body, {
            where : {id: req.params.id}
        });
        if (updated) {
            const updateUser = await User.findByPk(req.params.id);
            res.status(200).json(updateUser);
        }else {
            res.status(404).json({message: "User not found"});
        }
    }catch (err : any) {
        res.status(500).json({message: err.message})
    }
};

//Delete
export const deleteUser = async (
    req : Request,
    res : Response
): Promise<void> => {
    try {
        const deleted =await User.destroy({
            where: {id:req.params.id},
        });
        if (deleted) {
            res.status(200).json({message: "User deleted"});
        }else {
            res.status(404).json({message: "User not found"});
        }
    }catch (err : any) {
           res.status(500).json({message: err.message});    
        }
    };
