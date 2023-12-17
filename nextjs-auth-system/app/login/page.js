'use client'

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react"

import { toast } from "react-toastify"

const Login = () => {
    const router = useRouter()
    const { data: session, status: sessionStatus } = useSession()

    useEffect(() => {
        if (sessionStatus === "authenticated") {
            router.push("/dashboard")
        }
    }, [sessionStatus, router])

    const handleSubmit = async(e) =>{
        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value

        if(!email || !password){
            toast.error("Input data correctly")
            return
        }

        const res = await signIn("credentials", {
            redirect: false,
            email, password
        })

        console.log(res)

        if(res?.error){
            toast.error("Invalid credentials")
        }else{
            toast.success("Succesfully Logged in")
        }
    }


    return (
        sessionStatus !== "authenticated" && (
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                <div className="bg-white p-8 rounded w-96 shadow-md">
                    <h2 className=" font-bold border-b border-black mb-4 text-lg">Login</h2>
                    <form onSubmit={handleSubmit} >
                        <div className="mb-4 flex flex-col">
                            <label htmlFor="email" >
                                Email:
                            </label>
                            <input type="email" id="email" name="email" className="border rounded-md px-2" />
                        </div>
                        <div className="mb-4 flex flex-col">
                            <label htmlFor="password" >
                                Password:
                            </label>
                            <input type="password" id="password" name="password" className="border rounded-md px-2" />
                        </div>

                        <div>
                            <button type="submit" className="mb-5 w-full bg-blue-400 text-white rounded-sm py-1 font-mono uppercase duration-300 hover:bg-blue-600">
                                Login
                            </button>
                        </div>
                        <span>Don't have an account? </span>
                        <Link href="/register" className=" text-blue-700 font-mono">Register</Link>
                    </form>
                </div>
            </div>

        )
    )
}
export default Login