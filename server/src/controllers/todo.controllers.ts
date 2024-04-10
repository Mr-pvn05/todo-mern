import { Response } from "express"
import Todo from "../models/todo.model.ts";

export const addTodo = async (req: any, res: Response) => {
    try {
        const {todo, status} = req.body;

        const newTodo = new Todo({
            todo,
            createdBy: req.user._id
        });

        await newTodo.save();

        res.status(201).json({message: "Todo added successfully"});

    } catch (error:any) {
        console.log("Error in add todo : ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const getTodos = async (req: any, res: Response) => {
    try {
        const createdBy = req.user._id;

        const todos = await Todo.find({createdBy: createdBy});

        if(!todos) return res.status(200).json([]);

        res.status(200).json({todos});

    } catch (error:any) {
        console.log("Error in geting messsage : ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const updateStatus = async (req: any, res: Response) => {
    try {

        const todoId = req.params.id;

        let response = await Todo.findById(todoId);

        if(response) {
            response.status = !response?.status;
            await response.save();
            res.status(200).json({status: "Status updated sucessfully"});
        }

    } catch (error: any) {
        console.log("Error in updating status : ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const removeTodo = async (req: any, res: Response) => {
    try {
        const response = await Todo.deleteOne({_id: req.params.id}) as any
        if (response.deletedCount > 0) {
            return res.status(200).json({ message: "Todo deleted successfully" });
        } else {
            return res.status(404).json({ message: "Todo not found" });
        }

    } catch (error:any) {
        console.log("Error in delete todo : ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}