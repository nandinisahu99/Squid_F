import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({ ratio, setLoginRegister, setStory, setLogin, setForgetPassword }) {

    const [input, setInput] = useState({ email: "", password: "" });

    const handleClick = () => {
        setLogin(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:5000/user/login", {
            method: "POST",
            body: JSON.stringify(input),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    console.log(data.status);
                    setStory(true);
                    setLoginRegister(false);
                    toast(data.message);
                }
                else {
                    toast(data.message);
                }
            })
    };

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const handleGoogle=(e)=>{
        e.preventDefault();
        
        try{
            fetch("http://localhost:5000/user/responseGoogle",{
                method:"GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res)=>res.json())
            .then((data)=>{
                if(data.status){
                    setLoginRegister(false);
                    setStory(true);
                    toast(data.message);
                }
                else{
                    toast(data.message);
                }
            })
        }catch(err){
            throw err;
        }
    };

    const handleForget=()=>{
        try{
            setForgetPassword(true);
        }catch(err){
            throw err;
        }
    }
    return (
        <>
            <div className="md:mycontainer">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 text-white text-4xl p-2">Sign in to your account</h2>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm py-2">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-white text-xl">Email address</label>
                            <div className="mt-2">
                                <input id="email" value={input.email} onChange={handleChange} name="email" type="email" autoComplete="email" placeholder="name@company.com" required="" className="bg-transparent border border-gray-300 text-base text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 text-white text-xl">Password</label>
                                <div className="text-sm">
                                    <a onClick={handleForget} className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer">Forgot password?</a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input id="password" value={input.password} onChange={handleChange} name="password" type="password" autoComplete="current-password" required="" placeholder="••••••••" className="bg-transparent border border-gray-300 text-base text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-xl">Sign in</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500 text-white text-xl">
                        Not a member?{' '}
                        <a onClick={handleClick} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 mx-1 hover:cursor-pointer">Register Now</a>
                    </p>

                    <div id="divider-section" className="my-3 flex items-center">
                        <div className="flex-grow border-t border-gray-300 mx-2 max-w-xs"></div>
                        <span className="mx-2">OR</span>
                        <div className="flex-grow border-t border-gray-300 mx-2 max-w-xs"></div>
                    </div>
                    <span className="block text-center mb-3">Sign in using any of these</span>
                    <div id="signup-options" className="flex justify-center">
                        <a onClick={handleGoogle} href='http://localhost:5000/user/auth/google' className="mx-4 my-4 cursor-pointer">
                            <div className="w-10 h-10">
                                <img className="w-full h-full" src="/google.png" alt="Google" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
