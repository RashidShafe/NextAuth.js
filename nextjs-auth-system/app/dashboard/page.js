import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async() => {
    const session = await getServerSession();

    if(!session){
        redirect("/")
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <h2>Control Your World</h2>
        </div>
    )
}

export default Dashboard