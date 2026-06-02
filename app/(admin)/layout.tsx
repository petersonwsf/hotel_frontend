import Sidebar from '@/components/layout/Sidebar';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose'

export const metadata : Metadata = {
    title: 'Admin | Lúmen Hotel'
}

export default async function LayoutAdmin({ children } : { children: React.ReactNode }) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token')?.value;

    if (!token) redirect('/login');

    let isAuthorized : boolean = false;

    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_JWT));
        isAuthorized = payload.role === 'ADMIN' || payload.role === 'ATTENDANT'
    } catch (error : any) {
        console.log(error)
        isAuthorized = false;
    }

    if (!isAuthorized) redirect('/login');

    return (
        <div className="flex">
            <Sidebar />
            <main className='m-[2rem] p-[2rem] bg-white rounded-[10px] shadow-xl w-full'>
                { children }
            </main>
        </div>
    )
}