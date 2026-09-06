import { getUserById } from "@/lib/api/user"
import { notFound } from "next/navigation"
import AccountData from "./components/AccountData"

export default async function AccountPage({ params } : { params: Promise<{ id : string }>}) {

    const { id } = await params
    const user = await getUserById(Number(id))

    if (!user) notFound()

    return (
        <div>
            <div className="my-[1.5rem]">
                <AccountData user={user} />
            </div>
        </div>
    )
}