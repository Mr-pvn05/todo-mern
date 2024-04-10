import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: []
}

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {

        addTodos: (state, action: any) => {
                state.todos = action.payload
        },

        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
    }
})

export const {addTodos, removeTodo} = todoSlice.actions

export default todoSlice.reducer;