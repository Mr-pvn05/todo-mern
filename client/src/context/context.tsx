import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TodoContext = createContext();

export const TodoContextProivider = ({ children }) => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") as string));

  const checkUserAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const logout = () => {
    setLoading(true)

    axios.post("/api/auth/logout").then(() => {

      localStorage.removeItem("user");
      checkUserAuthenticated();
      setLoading(false)

    }).catch((err) => {

      console.log("Error in logout : ", err)
      setLoading(false)

    });
}

  const getTodos = async () => {
    try {
      const todos = await axios.get("/api/todo/get");
      return todos;

    } catch (error) {
      console.log("Error in getting todos : ", error)
    }
  }

  useEffect(() => {
    checkUserAuthenticated()
  },[])

  return (
    <TodoContext.Provider
      value={{ loading, setLoading, checkUserAuthenticated, logout, getTodos, currentUser}}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
