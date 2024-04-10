import { useState } from "react";
import { Link } from "react-router-dom";
import { useTodoContext } from "../context/context";
import { Loading } from "../components/index";
import toast from "react-hot-toast";
import React from "react";
import axios from "axios";

const LoginForm = () => {

    const {loading, setLoading, checkUserAuthenticated} = useTodoContext();

    const [input, setInput] = useState({
        username: "",
        password: ""
    })

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        if(input.password && input.username) {
            try {
                setLoading(true);

                const formData = {
                    username: input.username,
                    password: input.password
                }

                const res = await axios.post("/api/auth/login", formData, {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })

                  if(res) {
                    localStorage.setItem("user", JSON.stringify(res?.data))
                    checkUserAuthenticated();
                  }
                
            } catch (error) {
                console.log("Error in login : ", error)
                toast.error(error.response.data.error);

            } finally {
                setLoading(false)
            }

        } else{
            toast.error("Please fill all the fields")
        }
    }


    return (
        <main className="flex lg:h-[100vh]">
            <form onSubmit={submitHandler} className="w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start">
                <div className="p-8 w-[600px]">
                    <h1 className="text-6xl font-semibold">Login</h1>


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
                    <p className="mt-6 ml-1">
                        Don't have an account ?{" "}
                        <Link to="/signup" className="underline hover:text-blue-400 cursor-pointer">
                            Sign Up
                        </Link>
                    </p>
                    <button className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90 flex justify-center">
                    {loading ? <Loading/> : "Sign in"}
                    </button>
                </div>
            </form>
            <div
                className="w-[40%] bg-slate-400 bg-cover bg-right-top hidden lg:block"
                style={{
                    backgroundImage: "url('/login-banner.jpg')",
                }}
            ></div>
        </main>
    );
};

export default LoginForm;
