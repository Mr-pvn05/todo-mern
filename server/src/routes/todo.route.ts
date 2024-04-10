import express from "express"
import protectRoute from "../middleware/protectRoute.ts";
import { addTodo, getTodos, removeTodo, updateStatus } from "../controllers/todo.controllers.ts";

const router = express.Router();

router.post("/add",protectRoute, addTodo);
router.get("/get",protectRoute, getTodos);
router.delete("/delete/:id",protectRoute, removeTodo);
router.post("/status/:id",protectRoute, updateStatus);

export default router;