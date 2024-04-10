import { AiOutlinePlus } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import { useTodoContext } from "../context/context";
import { Loading } from "../components/index";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import { addTodos } from "../store/todoSlice";

const Home = () => {

  const dispatch = useDispatch();

  const { loading, setLoading, logout, getTodos, currentUser, checkUserAuthenticated} = useTodoContext();

  const [todo, setTodo] = useState("");
  const [todoStatus, setTodoStatus] = useState(false);

  // Add todo funcionality
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/todo/add", {todo: todo}, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      if(res) {
        setTodo("")
      }

    } catch (error) {
      console.log(error)
    }
  }

  // Delete todo functionality
  const deleteTodo = async (todoId: string) => {
    try {
      await axios.delete(`/api/todo/delete/${todoId}`)
    } catch (error) {
      console.log("Error in deleting todo : ", error)
    }
  }

  // Set todo status
  const updateTodoStatus = async (todoId: string) => {
    try {
      const res = await axios.post(`/api/todo/status/${todoId}`);
      if(res) {
         setTodoStatus((prev) => !prev);
      }

    } catch (error) {
      console.log("Error in upadating todo : ", error)
    }
  }
  
  useEffect(() => {
    getTodos().then((res) => {
      dispatch(addTodos(res?.data?.todos))
    })
  },[handleSubmit, deleteTodo, updateTodoStatus])

  
  
  const todos = useSelector(state => state?.todos);

  return (
    <main className="">
      <div
        onClick={logout}
        className="bg-black text-white w-44 py-4 mt-10 rounded-lg transition-transform hover:bg-black/[0.8] active:scale-90 flex items-center justify-center gap-2 font-medium shadow-md fixed bottom-5 right-5 cursor-pointer"
      >
        {loading ? (
          <Loading />
        ) : (
          <>
            {" "}
            <GoSignOut size={18} />
            <span>Log out</span>
          </>
        )}
      </div>
      <div className="max-w-3xl mx-auto mt-10 p-8">
        <div className="bg-white -m-6 p-3 sticky top-0">
          <div className="flex justify-center flex-col items-center">
            <span className="text-7xl mb-10">📝</span>
            <h1 className="text-5xl md:text-7xl font-bold">ToooDooo's</h1>
          </div>
          <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-10">
            <input
              placeholder={`👋 Hello ${currentUser?.fullname}, What to do Today?`}
              type="text"
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
              className="font-semibold placeholder:text-gray-500 border-[2px] border-black h-[60px] grow shadow-sm rounded-md px-4 focus-visible:outline-yellow-400 text-lg transition-all duration-300"
              autoFocus
            />
            <button onClick={handleSubmit} className="w-[60px] h-[60px] rounded-md bg-black flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-black/[0.8]">
              <AiOutlinePlus size={30} color="#fff" />
            </button>
          </form>
        </div>
        <div className="my-10">
          {todos?.map((todo) => (
            <div key={todo?._id} className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-green-400 rounded-lg"
                  onChange={() => updateTodoStatus(todo?._id)}
                  checked={todo.status}
                />
                <label className={`${todo?.status ? "line-through" : ""} font-medium`}>
                  {todo?.todo}
                </label>
              </div>

              <div className="flex items-center gap-3" onClick={() => deleteTodo(todo?._id)}>
                <MdDeleteForever
                  size={24}
                  className="text-red-400 hover:text-red-600 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
