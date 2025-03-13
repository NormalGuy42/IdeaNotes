
import { auth, signOut } from "../../../auth";
import { logout } from "@/lib/actions/user.actions";

export default async function Profile(){
    const session = await auth()
    if (!session) return <div>Not authenticated</div> 

    return(
        <div className="grid grid-cols-1 justify-items-center content-center h-screen">
            <form action={logout}>
                {session?.user.email}
                <button className="main-btn w-40">
                    Sign Out
                </button>
            </form>
        </div>
    )
}