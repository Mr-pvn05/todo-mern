import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast"
import React from "react";
import axios from "axios";
import { useTodoContext } from "../context/context";
import { Loading } from "../components/index";

const Signup = () => {

  const {loading, setLoading, checkUserAuthenticated} = useTodoContext();

  const [input, setInput] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: ""
  })

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.fullname && input.username && input.password && input.confirmPassword) {

      if (input.password.length > 7) {

        if(input.password === input.confirmPassword) {

          const formData = {
            fullname: input.fullname,
            username: input.username,
            password: input.password,
            confirmPassword: input.confirmPassword
          }

          try {
            setLoading(true);
            const res = await axios.post("/api/auth/signup", formData,{
              headers: {
                "Content-Type": "application/json",
              },
            })

            if(res) {
              localStorage.setItem("user", JSON.stringify(res?.data));
              checkUserAuthenticated();
            }
          } catch (error: unknown) {
            toast.error(error.response.data)
          } finally {
            setLoading(false)
          }



        } else{
          toast.error("Passwords do not match");
        }

      } else {
        toast.error("Password must be at least 8 characters long");
      }

    } else {
      toast.error("Please fill all the fields");
    }
  }

  return (
    <main className="flex lg:h-screen overflow-hidden">
      <form onSubmit={submitHandler} className="w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start">
        <div className="p-8 w-[600px]">
          <h1 className="text-6xl font-semibold">Sign Up</h1>

          <div className="mt-10 pl-1 flex flex-col">
            <label>Fullname</label>
            <input
              type="text"
              className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
              value={input.fullname}
              onChange={(e) => setInput({...input, fullname: e.target.value})}
            />
          </div>
          <div className="mt-10 pl-1 flex flex-col">
            <label>Username</label>
            <input
              type="text"
              className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
              value={input.username}
              onChange={(e) => setInput({...input, username: e.target.value})}
            />
          </div>
          <div className="mt-10 pl-1 flex flex-col">
            <label>Password</label>
            <input
              type="password"
              className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
              value={input.password}
              onChange={(e) => setInput({...input, password: e.target.value})}
            />
          </div>
          <div className="mt-10 pl-1 flex flex-col">
            <label>Confirm Password</label>
            <input
              type="password"
              className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
              value={input.confirmPassword}
              onChange={(e) => setInput({...input, confirmPassword: e.target.value})}
            />
          </div>
          <p className="mt-6 ml-1">
            Already have an account ?{" "}
            <Link to="/login" className="underline hover:text-blue-400 cursor-pointer">
              Login
            </Link>
          </p>
          <button className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90 flex justify-center">
            {loading ? <Loading/> : "Sign Up"}
          </button>
        </div>
      </form>
      <div
        className="w-[40%] bg-slate-400 bg-cover bg-right-top hidden lg:block"
      >
        <img src="./login-banner.jpg" alt="todo image" />
      </div>
    </main>
  );
};

export default Signup;
