'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"
import Link from "next/link"

const page = () => {
    const router = useRouter()
    const { data: session, status: sessionStatus } = useSession()

    useEffect(() => {
        if (sessionStatus === "authenticated") {
            router.push("/dashboard")
        }
    }, [sessionStatus, router])

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const username = e.target.username.value
        const email = e.target.email.value
        const password = e.target.password.value
        const confirmPassword = e.target.confirmPassword.value

        // console.log(`${username} ${email} ${password} ${confirmPassword}`);

        if(!username || !email || !password || !confirmPassword){
            toast.error("Input data correctly")
            return
        }
        else if(password !== confirmPassword){
            toast.warn("Password not Matched")
            retrun
        }

        try {
            const res = await fetch('/api/register',{
                method: "POST",
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    confirmPassword
                })
            })

            
            if(res.status === 400){
                toast.error(res.error)
            }
            else if(res.status === 201){
                router.push('/login')
            }
            
        } catch (error) {
            toast.error("wrong");
        }

        if(sessionStatus === 'loading'){
            return <h1> Loadings..... </h1>
        }
    }


    return sessionStatus !== 'authenticated' && (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded shadow-md w-96 p-8">
                <h2 className="text-2xl font-semibold mb-4">
                    Registration
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4 text-sm font-mono font-bold">
                        <label className="block " >
                            User Name:
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full px-2 border rounded-sm border-sky-400 "
                        />
                    </div>

                    <div className="mb-4 text-sm font-mono font-bold">
                        <label className="block " >
                            E-mail:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-2 border rounded-sm border-sky-400 "
                        />
                    </div>
                    <div className="mb-4 text-sm font-mono font-bold">
                        <label className="block " >
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-2 border rounded-sm border-sky-400 "
                        />
                    </div>
                    <div className="mb-4 text-sm font-mono font-bold">
                        <label className="block " >
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-full px-2 border rounded-sm border-sky-400 "
                        />
                    </div>

                    <div className="flex bg-slate-300 mb-6">
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-500 rounded-sm font-mono"
                        >
                            Register
                        </button>
                    </div>
                    <div className="text-xs">
                        Already have an account?
                        <Link href="/login" className="ml-2 text-blue-600 hover:underline">
                            Login
                        </Link>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default page;