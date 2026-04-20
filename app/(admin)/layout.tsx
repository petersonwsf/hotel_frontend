import Sidebar from '@/components/layout/Sidebar';
import { Metadata } from 'next';

export const metadata : Metadata = {
    title: 'Admin | Lúmen Hotel'
}

export default async function LayoutAdmin({ children } : { children: React.ReactNode }) {
    return (
        <div className="flex">
            <Sidebar />
            <main className='m-[2rem] p-[2rem] bg-white rounded-[10px] shadow-xl w-full'>
                { children }
            </main>
        </div>
    )
}