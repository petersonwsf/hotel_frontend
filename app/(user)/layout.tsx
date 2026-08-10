import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose'
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SidebarUser from '@/components/layout/SidebarUser';

export const metadata : Metadata = {
    title: 'Minha conta | Lúmen Hotel'
}

export default async function LayoutAdmin({ children } : Readonly<{ children: React.ReactNode }>) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token')?.value;

    if (!token) redirect('/login');

    let isAuthorized : boolean = false;

    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_JWT));
        isAuthorized = payload.role === 'CLIENT'
    } catch (error : any) {
        console.log(error.response)
        isAuthorized = false;
    }

    if (!isAuthorized) redirect('/login');

    return (
        <div>
            <Header />
                <main className="min-h-[80vh] w-7xl m-auto my-[2rem] flex gap-[2rem]">
                    <SidebarUser />
                    {children}
                </main>
            <Footer />
        </div>
    )
}